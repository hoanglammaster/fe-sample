export type Response = {
  GET: {
    id?: number
    name: string
    code: string
    imageUrl: string
    description: string
    status: string
    systemType: string
    systemLink?: string
    version?: number
  }
}

export type RequestBody = {
  POST: {
    id?: number
    name: string
    code: string
    imageUrl: string
    description: string
    status: string
    systemType: string
    systemLink?: string
    version?: number
  }
}
