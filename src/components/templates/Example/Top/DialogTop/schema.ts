import { z, ZodSchema } from 'zod'
import { RequestBody } from './type'

export const PostInputSchema: ZodSchema<RequestBody['POST']> = z.object({
  name: z.string().min(1, 'Please input username'),
  age: z.number(),
  test: z.string(),
  isActive: z.boolean(),
  isStatus: z.boolean(),
  radio1: z.string(),
  radio2: z.string(),
  textEditor: z.string().min(1, 'Please input text editor'),
})

export type PostInput = z.infer<typeof PostInputSchema>
