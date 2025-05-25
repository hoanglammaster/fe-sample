export type ResponseType = {
  POST: {
    id?: number
    systemId: number | string | null
    platform: string
    position: string
    menus: any[]
    status: string
    version: string
    search?: string
  }
}
