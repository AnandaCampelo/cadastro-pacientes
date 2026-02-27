import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Informe seu e-mail ou CPF")
    .refine(
      (val) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ||
        /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/.test(val),
      { message: "Informe um e-mail ou CPF válido" }
    ),
  password: z.string().min(1, "Informe sua senha"),
});

export type SignInData = z.infer<typeof signInSchema>;
