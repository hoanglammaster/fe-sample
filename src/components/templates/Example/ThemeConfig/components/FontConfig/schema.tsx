import { z, ZodSchema } from 'zod'
import { FontConfig } from './type'

export const FontConfigSchema: ZodSchema<FontConfig> = z.object({
  h1Color: z.string(),
  h1Font: z.string(),
  h1Size: z.number(),

  h2Color: z.string(),
  h2Font: z.string(),
  h2Size: z.number(),

  h3Color: z.string(),
  h3Font: z.string(),
  h3Size: z.number(),

  h4Color: z.string(),
  h4Font: z.string(),
  h4Size: z.number(),

  h5Color: z.string(),
  h5Font: z.string(),
  h5Size: z.number(),

  h6Color: z.string(),
  h6Font: z.string(),
  h6Size: z.number(),

  subtitle1Color: z.string(),
  subtitle1Font: z.string(),
  subtitle1Size: z.number(),

  subtitle2Color: z.string(),
  subtitle2Font: z.string(),
  subtitle2Size: z.number(),

  body1Color: z.string(),
  body1Font: z.string(),
  body1Size: z.number(),

  body2Color: z.string(),
  body2Font: z.string(),
  body2Size: z.number(),

  captionColor: z.string(),
  captionFont: z.string(),
  captionSize: z.number(),
})

export type FontConfigInput = z.infer<typeof FontConfigSchema>
