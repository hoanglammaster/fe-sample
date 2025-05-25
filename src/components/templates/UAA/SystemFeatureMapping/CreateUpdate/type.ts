export interface FeatureList {
  code: string
  id?: number
  name: string
}

export interface CreateUpdateSystemFeatureProps {
  systemId?: number
  featureList: FeatureList[]
  featureIds: number[]
  attachedFeatureIds?: number[]
  detachedFeatureIds?: number[]
  transType: number | null
  service: number | null
  feature: string
}
