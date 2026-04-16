import * as z from 'zod';

export const doctorSchema = z.object({
  nome: z.string().min(3, 'errors.min_length_3'),
  CRM: z.string().min(1, 'errors.required'),
  UFCRM: z.string().length(2, 'errors.length_2'),
});
