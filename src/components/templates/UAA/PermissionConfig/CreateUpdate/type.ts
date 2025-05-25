export interface PermissionGroupType {
  id?: number
  code: string
  systemId: number
  name: string
  featureActionRefs: any[]
  attachFeatureActionRefs?: any[]
  detachFeatureActionRefs?: any[]
  status: string
  searchFeature: string
  version?: number
}
