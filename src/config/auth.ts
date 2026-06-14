import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional().default(false),
});

export const signUpSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Must be at least 8 characters')
    .regex(/[A-Z]/, 'Include at least one uppercase letter')
    .regex(/[0-9]/, 'Include at least one number'),
});

export type LoginValues = z.infer<typeof loginSchema>;
export type SignUpValues = z.infer<typeof signUpSchema>;

function fieldValidator<T>(schema: z.ZodType<T>) {
  return ({ value }: { value: T }): string | undefined =>
    schema.safeParse(value).error?.issues[0]?.message;
}

export const validateEmail = fieldValidator(loginSchema.shape.email);
export const validatePassword = fieldValidator(loginSchema.shape.password);
export const validateFullName = fieldValidator(signUpSchema.shape.fullName);
export const validateNewPassword = fieldValidator(signUpSchema.shape.password);
