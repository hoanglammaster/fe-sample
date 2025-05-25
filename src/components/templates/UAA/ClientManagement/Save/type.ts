export interface ClientType {
  id?: number
  clientId?: string
  clientSecret?: string
  authorizedGrantTypes: string
  authorities: string
  accessTokenValiditySeconds: number
  refreshTokenValiditySeconds: number
  code: string
  codeExternal: string
  name: string
  nameExternal: string
  partnerCode?: string | null
  type?: string
  description: string
  representative?: string
  email: string
  status: string
  service: any
  ipAddresses: any[]
  authenticationType: string | null
  version?: number
  isUsingIP?: boolean
}

export interface ConfigParam {
  GET: {
    configKey: string
  }
}
