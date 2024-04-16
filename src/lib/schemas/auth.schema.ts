import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  mobile: z.number().min(10),
  password: z.string().min(8),
  type: z.string().optional(),
});
