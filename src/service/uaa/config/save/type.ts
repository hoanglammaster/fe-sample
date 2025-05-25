export type RequestBody = {
  SAVE: {
    id?: number | null
    code: string
    name: string
    type: string | null
    isDisplay: boolean
    attributeValues: {
      id?: number
      keyAtb: string
      value: string
    }[]
    deleteAttributeValueIds?: any
  }
}
