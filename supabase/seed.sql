-- Test data: the same venue and menu as the mock data in src/data/.
-- The venue is at Oulu market square. Move it if you test somewhere else.

with venue as (
  insert into public.venues (
    name, description, categories, location,
    delivery_minutes_min, delivery_minutes_max, rating, is_open
  )
  values (
    'Café Aalto',
    'Nordic coffee, flaky pastries and all-day favourites.',
    array['Coffee', 'Pastries', 'Breakfast'],
    -- Longitude first, then latitude.
    extensions.st_point(25.4637, 65.0137)::extensions.geography,
    10,
    15,
    4.8,
    true
  )
  returning id
)
insert into public.menu_items (venue_id, name, description, price_cents, category, is_popular)
select venue.id, item.name, item.description, item.price_cents, item.category, item.is_popular
from venue, (
  values
    ('Oat latte', 'Double espresso, silky oat milk', 480, 'Coffee', true),
    ('Butter croissant', 'Baked here every morning', 360, 'Pastries', true),
    ('Aalto brunch', 'Eggs, sourdough, seasonal greens', 1290, 'Food', true),
    ('Espresso', 'Short, rich and locally roasted', 300, 'Coffee', false),
    ('Cappuccino', 'Espresso with velvety milk foam', 450, 'Coffee', false),
    ('Cinnamon bun', 'Finnish korvapuusti with cardamom', 390, 'Pastries', false),
    ('Avocado toast', 'Sourdough, avocado, chili and lime', 950, 'Food', false)
) as item(name, description, price_cents, category, is_popular);
