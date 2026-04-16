import * as z from 'zod';

export const patientSchema = z.object({
  nome: z.string().min(3, 'errors.min_length_3'),
  dataNascimento: z.string().min(1, 'errors.required'),
  carteirinha: z.string().min(1, 'errors.required'),
  cpf: z.string().min(11, 'errors.min_length_11'),
});
