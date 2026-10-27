import { supabase } from '@/lib/supabase';
import { type MenuItem } from '@/types/menu';

export async function getMenu(venueId: string): Promise<MenuItem[]> {
  const { data, error } = await supabase
    .from('menu_items')
    .select('id, venue_id, name, description, price_cents, category, is_popular, image_url')
    .eq('venue_id', venueId)
    .order('category')
    .order('name');
  if (error) throw error;

  return data.map((row) => ({
    id: row.id,
    venueId: row.venue_id,
    name: row.name,
    description: row.description,
    priceCents: row.price_cents,
    category: row.category,
    isPopular: row.is_popular,
    image: row.image_url ? { uri: row.image_url } : undefined,
  }));
}
