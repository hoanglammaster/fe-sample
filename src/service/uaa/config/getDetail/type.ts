import { BaseResponse } from '@/service/type'

export type AttributeDetail = {
  id: number
  code: string
  name: string
  groupId: number
  type: string
  isRequire: true
  status: string
  attributeValues: {
    id: number
    keyAtb: string
    value: string
    createdAt: string
    updatedAt: string
    createdBy: number
    updatedBy: number
  }[]

  attributeValue: {
    id: number
    keyAtb: string
    value: string
    createdAt: string
    updatedAt: string
    createdBy: number
    updatedBy: number
  }
  createdAt: string
  updatedAt: string
  deletedAt: string
  createdBy: number
  updatedBy: number
  deletedBy: number
}

export type RequestParams = {
  GET: { id: number }
}

export type Response = {
  GET: BaseResponse<AttributeDetail>
}
