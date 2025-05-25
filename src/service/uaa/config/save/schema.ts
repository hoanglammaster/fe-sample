import { ZodSchema, z } from 'zod'
import { RequestBody } from './type'

export const SaveInputSchema: ZodSchema<RequestBody['SAVE']> = z.object({
  id: z.number().nullable().optional(),
  code: z.string(),
  name: z.string(),
  type: z.string(),
  isDisplay: z.boolean(),
  attributeValues: z.array(
    z.object({
      id: z.number().optional(),
      keyAtb: z.string().min(1),
      value: z.string().min(1),
    })
  ),
  deleteAttributeValueIds: z.any(),
})

export type SaveInput = z.infer<typeof SaveInputSchema>
