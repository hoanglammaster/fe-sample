import { ZodSchema, z } from 'zod'
import { RequestBody } from './type'

export const PostInputSchema: ZodSchema<RequestBody['POST']> = z.object({
  id: z.optional(z.number()),
  name: z.string().min(1),
  code: z.string().min(1),
  imageUrl: z.string().min(1),
  description: z.string().min(1),
  status: z.string(),
  systemLink: z.string(),
  systemType: z.string(),
})

export type PostInput = z.infer<typeof PostInputSchema>
