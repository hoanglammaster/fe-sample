import { z, ZodSchema } from 'zod'
import { RequestBody } from './type'

export const PostInputSchema: ZodSchema<RequestBody['POST']> = z.object({
  name: z.string().min(1, 'Please input username'),
  option: z.string().min(1, 'Please choose select.'),
  date: z.any(),
  autoComplete: z
    .array(
      z.object({
        label: z.string(),
        value: z.number(),
      })
    )
    .min(1, 'required'),
  isActive: z.boolean(),
  isStatus: z.boolean(),
  radio1: z.boolean(),
  radio2: z.string(),
  area: z.string().min(1, 'Please input text area'),
  textEditor: z.string().min(1, 'Please input text editor'),
  imageUrl: z.string(),
  color: z.string(),
})

export type PostInput = z.infer<typeof PostInputSchema>
