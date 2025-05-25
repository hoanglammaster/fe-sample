export type Response = {
  GET: {
    id?: number
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    username: string
    sex: string
    password?: string
    groupPermissionIds: any[]
    products?: any[]
    isGeneratePassword: boolean
  }
}
export type RequestBody = {
  POST: {
    id?: number
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    username: string
    sex: string | null
    password?: string
    rePassword?:string
    groupPermissionIds: any[]
    products?: any[]
    roleTypeId?: number
    tierId?: number
    phoneNumberOTP?: number
    isGeneratePassword: boolean
    systemId?: number
    lang?: number
    status: string
    roleTypeResponse:any
    tierResponse:any
  }
}
