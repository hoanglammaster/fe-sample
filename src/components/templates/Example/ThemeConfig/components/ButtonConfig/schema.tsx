import { z, ZodSchema } from 'zod'
import { ButtonConfig } from './type'

export const ButtonConfigSchema: ZodSchema<ButtonConfig> = z.object({
  submitButton: z.object({
    textColor: z.string(),
    hoverTextColor: z.string(),
    backgroundColor: z.string(),
    backgroundHoverColor: z.string(),
    borderColor: z.string(),
    borderHoverColor: z.string(),
  }),
  draftButton: z.object({
    textColor: z.string(),
    hoverTextColor: z.string(),
    backgroundColor: z.string(),
    backgroundHoverColor: z.string(),
    borderColor: z.string(),
    borderHoverColor: z.string(),
  }),
  rejectButton: z.object({
    textColor: z.string(),
    hoverTextColor: z.string(),
    backgroundColor: z.string(),
    backgroundHoverColor: z.string(),
    borderColor: z.string(),
    borderHoverColor: z.string(),
  }),
  resetButton: z.object({
    textColor: z.string(),
    hoverTextColor: z.string(),
    backgroundColor: z.string(),
    backgroundHoverColor: z.string(),
    borderColor: z.string(),
    borderHoverColor: z.string(),
  }),
})

export type ButtonConfigInput = z.infer<typeof ButtonConfigSchema>
