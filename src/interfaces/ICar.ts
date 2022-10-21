import { z } from 'zod';

export const CarZodSchema = z.object({
  _id: z.string().optional(),
  model: z.string().min(3),
  year: z.number().int().gte(1900).lte(2022),
  color: z.string().min(3),
  status: z.boolean().optional(),
  buyValue: z.number().int(),
  doorsQty: z.number().int().gte(2).lte(4),
  seatsQty: z.number().int().gte(2).lte(7),
});

export type ICar = z.infer<typeof CarZodSchema>;
