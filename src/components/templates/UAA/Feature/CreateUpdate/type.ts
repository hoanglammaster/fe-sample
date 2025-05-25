export interface ServiceFeature {
  serviceName?: number
  id: number
  name: string
}

export interface CreateUpdateFeatureProps {
  id?: number
  name: string
  nameNormal: string
  code: string
  codeNormal: string
  serviceCode?: string | null
  serviceId?: string | null
  partnerCode?: string | null
  subPartnerCode?: string | null
  partnerId?: string | null
  description: string
  status: string
  systemId?: number | null
  type: string
  transTypeCode?: string | null
  apis: any[]
  version?: number
  accessChannel?: string | null
  microServiceId?: number | null
  isIntermediary?: boolean
  subMenuId?: number | null
}
