import { ItemsResponseSchema } from '@/src/app/entities/item/schema';

export async function getItems() {
  const res = await fetch('https://api.example.com/items', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch');
  const json = await res.json();
  return ItemsResponseSchema.parse(json);
}
