import { z } from 'zod';

export const MotorcycleZodSchema = z.object({
  _id: z.string().optional(),
  model: z.string().min(3),
  year: z.number().int().gte(1900).lte(2022),
  color: z.string().min(3),
  status: z.boolean().optional(),
  buyValue: z.number().int(),
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().int().gt(0).lte(2500),
});

export type IMotorcycle = z.infer<typeof MotorcycleZodSchema>;
