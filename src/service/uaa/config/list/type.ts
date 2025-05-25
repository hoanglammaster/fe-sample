import { PageResponse } from '@/service/type'

type Config = {
  createdAt: string
  updatedAt: string
  createdBy: any
  updatedBy: any
  id: number
  configGroupName: string
  configKey: string
  configValue: string
  dataType: string
  defaultValue: string
  description: string
}

export type Response = {
  GET: PageResponse<Config[]>
}

export type RequestBody = {
  GET: {
    search?: string
    configGroupId?: number | null
    status?: string
    page: number
    size: number
  }
  POST: {
    id: number
    status: string
  }
}
