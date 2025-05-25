export interface FeatureList {
  code: string
  groupPermissionId?: number
  groupPermissionName?: string
}

export interface CreateUpdateSystemFeatureProps {
  roleTypeId?: number
  tierId?: number
  groupPermissionList: FeatureList[]
  attachedFeatureIds?: number[]
  detachFeatureIds?: number[]
}
