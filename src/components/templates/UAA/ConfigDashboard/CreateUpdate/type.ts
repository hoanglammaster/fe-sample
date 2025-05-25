export interface RequestBody {
  POST: {
    id?: string
    title: string
    description: string
    productId: number | string
    menuIds: any[]
  }
}
