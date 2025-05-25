export interface ScopeType {
  id?: number
  code: string
  name: string
  apiIds: number[]
  detachedApiIds?: number[]
  attachedApiIds?: number[]
  status: string
  serviceId?: number
  searchApi: string
  version?: number
}
