import { z, ZodSchema } from 'zod'
import { ThemeColorConfig } from './type'

export const ThemeColorConfigSchema: ZodSchema<ThemeColorConfig> = z.object({
  layout: z.string().nullable().optional(),
  theme: z.string().nullable().optional(),
  firstMainColor: z.string(),
  secondMainColor: z.string(),
  thirdMainColor: z.string(),
  fourthMainColor: z.string(),
  successColor: z.string(),
  errorColor: z.string(),
  warningColor: z.string(),
})

export type ThemeColorConfigInput = z.infer<typeof ThemeColorConfigSchema>
