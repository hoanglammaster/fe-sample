export interface FeatureList {
  code: string
  id?: number
  name: string
}

export interface CreateupdateSystemFeatureProps {
  clientId?: number
  scopeList: FeatureList[]
  attachedFeatureIds?: number[]
  dettachFeatureIds?: number[]
  searchScope?: string
}
