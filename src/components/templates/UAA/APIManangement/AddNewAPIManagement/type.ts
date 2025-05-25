export type RequestBody = {
  POST: {
    id?: number
    code: string
    name: string
    serviceId?: number
    endpoint: string
    method: string
    status: string
    type: string
    isAuthorized: boolean
    description: string
  }
}

export type Response = {
  GET: {
    id?: number
    code: string
    name: string
    serviceId?: number
    endpoint: string
    method: string
    status: string
    type: string
    isAuthorized: boolean
    description: string
    service?: any
    version?: number
  }
}
