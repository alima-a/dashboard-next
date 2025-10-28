import { z } from 'zod';
export const ItemSchema = z.object({
    id: z.number(),
    name: z.string(),
    value: z.number().optional(),
});
export const ItemsResponseSchema = z.object({
    items: z.array(ItemSchema),
});