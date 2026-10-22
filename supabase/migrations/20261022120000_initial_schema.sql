create extension if not exists postgis with schema extensions;

-- Types ----------------------------------------------------------------------

-- The same steps as OrderStatus in src/types/order.ts.
create type public.order_status as enum (
  'awaiting_payment',
  'paid',
  'preparing',
  'on_the_way',
  'delivered',
  'cancelled'
);

-- Tables ---------------------------------------------------------------------

-- A user's public details. Supabase Auth keeps the login details (email, password) in auth.users.
create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

create table public.venues (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  categories text[] not null default '{}',
  image_url text,
 location extensions.geography(point) not null,
  delivery_minutes_min integer not null check (delivery_minutes_min >= 0),
  delivery_minutes_max integer not null,
  -- Empty until the venue has ratings.
  rating numeric(2, 1) check (rating between 0 and 5),
  is_open boolean not null default false,
  created_at timestamptz not null default now(),
  check (delivery_minutes_max >= delivery_minutes_min)
);

-- Makes "venues near me" fast, also with many venues.
create index venues_location_idx on public.venues using gist (location);

create table public.venue_staff (
  venue_id uuid not null references public.venues on delete cascade,
  user_id uuid not null references public.profiles on delete cascade,
  primary key (venue_id, user_id)
);

create index venue_staff_user_id_idx on public.venue_staff (user_id);

create table public.menu_items (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid not null references public.venues on delete cascade,
  name text not null,
  description text not null default '',
  price_cents integer not null check (price_cents >= 0),
  category text not null,
  is_popular boolean not null default false,
  image_url text,
  created_at timestamptz not null default now()
);

create index menu_items_venue_id_idx on public.menu_items (venue_id);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  -- The short number the customer and the staff see, e.g. "Order 1042".
  number integer generated always as identity (start with 1000) unique,
  customer_id uuid not null references public.profiles on delete cascade,
  -- A venue with orders can't be deleted, so its order history stays complete.
  venue_id uuid not null references public.venues on delete restrict,
  status public.order_status not null default 'awaiting_payment',
  total_cents integer not null check (total_cents >= 0),
  -- Where to bring the order (DeliverySpot in the app).
  spot_label text not null,
  spot_location extensions.geography(point),
  -- Where the spot photo is saved in Supabase Storage.
  spot_photo_path text,
  spot_hint text not null default '',
  created_at timestamptz not null default now()
);

create index orders_customer_id_idx on public.orders (customer_id, created_at desc);
create index orders_venue_id_idx on public.orders (venue_id, created_at desc);

-- A copy of each item as it was ordered, so later menu changes don't change old orders.
create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders on delete cascade,
  -- Becomes empty if the venue deletes the item from its menu. The copy below stays.
  menu_item_id uuid references public.menu_items on delete set null,
  name text not null,
  quantity integer not null check (quantity > 0),
  unit_price_cents integer not null check (unit_price_cents >= 0)
);

create index order_items_order_id_idx on public.order_items (order_id);

-- Profiles for new users --------------------------------------------------------

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Users who signed up before this migration get a profile too.
insert into public.profiles (id, full_name)
select id, raw_user_meta_data ->> 'full_name' from auth.users
on conflict (id) do nothing;

-- Access rules (row level security) ---------------------------------------------

alter table public.profiles enable row level security;
alter table public.venues enable row level security;
alter table public.venue_staff enable row level security;
alter table public.menu_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- True if the signed-in user works at the venue.
create function public.is_venue_staff(venue_id uuid)
returns boolean
language sql
stable
set search_path = ''
as $$
  select exists (
    select 1
    from public.venue_staff as staff
    where staff.venue_id = is_venue_staff.venue_id
      and staff.user_id = (select auth.uid())
  );
$$;

create policy "Users can see their own profile"
  on public.profiles for select to authenticated
  using (id = (select auth.uid()));

create policy "Users can edit their own profile"
  on public.profiles for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

create policy "Anyone can see venues"
  on public.venues for select to anon, authenticated
  using (true);

create policy "Staff can edit their venue"
  on public.venues for update to authenticated
  using (public.is_venue_staff(id))
  with check (public.is_venue_staff(id));

create policy "Users can see where they work"
  on public.venue_staff for select to authenticated
  using (user_id = (select auth.uid()));

create policy "Anyone can see menus"
  on public.menu_items for select to anon, authenticated
  using (true);

create policy "Staff can add menu items"
  on public.menu_items for insert to authenticated
  with check (public.is_venue_staff(venue_id));

create policy "Staff can edit menu items"
  on public.menu_items for update to authenticated
  using (public.is_venue_staff(venue_id))
  with check (public.is_venue_staff(venue_id));

create policy "Staff can delete menu items"
  on public.menu_items for delete to authenticated
  using (public.is_venue_staff(venue_id));

-- Orders are created only through place_order() below, so there is no insert policy.
create policy "Customers see their orders, staff see their venue's orders"
  on public.orders for select to authenticated
  using (customer_id = (select auth.uid()) or public.is_venue_staff(venue_id));

create policy "Staff can update their venue's orders"
  on public.orders for update to authenticated
  using (public.is_venue_staff(venue_id))
  with check (public.is_venue_staff(venue_id));

-- An order's items are visible to whoever can see the order.
create policy "Order items are visible with their order"
  on public.order_items for select to authenticated
  using (exists (select 1 from public.orders where orders.id = order_items.order_id));

-- Table permissions ---------------------------------------------------------------

revoke all on public.profiles, public.venues, public.venue_staff,
  public.menu_items, public.orders, public.order_items
  from anon, authenticated;

grant all on public.profiles, public.venues, public.venue_staff,
  public.menu_items, public.orders, public.order_items
  to service_role;

grant select on public.venues, public.menu_items to anon, authenticated;
grant select on public.profiles, public.venue_staff, public.orders, public.order_items
  to authenticated;

grant update (full_name, avatar_url) on public.profiles to authenticated;
-- Not the rating: a venue can't rate itself.
grant update (name, description, categories, image_url, location,
  delivery_minutes_min, delivery_minutes_max, is_open)
  on public.venues to authenticated;
grant insert, update, delete on public.menu_items to authenticated;
-- Staff only move the status along. Prices and totals never change after ordering.
grant update (status) on public.orders to authenticated;

-- Functions the app calls ------------------------------------------------------------

-- The venues near a point, closest first:
-- supabase.rpc('nearby_venues', { lat: 65.01, long: 25.47 })
create function public.nearby_venues(
  lat double precision,
  long double precision,
  max_distance_meters double precision default 5000
)
returns table (
  id uuid,
  name text,
  description text,
  categories text[],
  image_url text,
  delivery_minutes_min integer,
  delivery_minutes_max integer,
  rating numeric,
  is_open boolean,
  latitude double precision,
  longitude double precision,
  distance_meters double precision
)
language sql
stable
set search_path = ''
as $$
  select
    venues.id,
    venues.name,
    venues.description,
    venues.categories,
    venues.image_url,
    venues.delivery_minutes_min,
    venues.delivery_minutes_max,
    venues.rating,
    venues.is_open,
    extensions.st_y(venues.location::extensions.geometry),
    extensions.st_x(venues.location::extensions.geometry),
    extensions.st_distance(venues.location, here.point)
  from
    public.venues,
    -- Longitude comes first in PostGIS points.
    (select extensions.st_point(nearby_venues.long, nearby_venues.lat)::extensions.geography as point) as here
  where extensions.st_dwithin(venues.location, here.point, nearby_venues.max_distance_meters)
  order by venues.location operator(extensions.<->) here.point;
$$;

create function public.place_order(venue uuid, items jsonb, spot jsonb)
returns public.orders
language plpgsql
-- Runs with the owner's rights, because users can't insert orders themselves.
security definer
set search_path = ''
as $$
declare
  new_order public.orders;
  item_count integer;
begin
  if (select auth.uid()) is null then
    raise exception 'Sign in to place an order.';
  end if;

  if not exists (select 1 from public.venues where id = venue and is_open) then
    raise exception 'This venue is not taking orders right now.';
  end if;

  insert into public.orders (
    customer_id, venue_id, status, total_cents,
    spot_label, spot_hint, spot_location, spot_photo_path
  )
  values (
    (select auth.uid()),
    venue,
    'paid',
    0,
    coalesce(spot ->> 'label', ''),
    coalesce(spot ->> 'hint', ''),
    extensions.st_point((spot ->> 'longitude')::float, (spot ->> 'latitude')::float)::extensions.geography,
    spot ->> 'photo_path'
  )
  returning * into new_order;

  insert into public.order_items (order_id, menu_item_id, name, quantity, unit_price_cents)
  select new_order.id, menu_item.id, menu_item.name, line.quantity, menu_item.price_cents
  from jsonb_to_recordset(items) as line(menu_item_id uuid, quantity integer)
  join public.menu_items as menu_item
    on menu_item.id = line.menu_item_id and menu_item.venue_id = venue;

  get diagnostics item_count = row_count;
  if item_count = 0 or item_count <> jsonb_array_length(items) then
    raise exception 'Some items are not on this venue''s menu.';
  end if;

  update public.orders
  set total_cents = (
    select sum(quantity * unit_price_cents) from public.order_items where order_id = new_order.id
  )
  where id = new_order.id
  returning * into new_order;

  return new_order;
end;
$$;

revoke execute on function public.place_order from public, anon;
grant execute on function public.place_order to authenticated;
grant execute on function public.nearby_venues to anon, authenticated;
grant execute on function public.is_venue_staff to authenticated;

-- Live updates -------------------------------------------------------------------------

alter publication supabase_realtime add table public.orders;
