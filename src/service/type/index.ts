export type BaseResponse<T> = {
  httpCode: number
  traceId: string
  responseCode: string
  description: string
  data?: T
  fieldErrors?: any
}

export type PageResponse<T> = {
  httpCode: number
  traceId: string
  responseCode: string
  description: string
  data?: {
    content: T
    page: number
    size: number
    sort: string
    totalElements: number
    totalPages: number
    numberOfElements: number
  }
  fieldErrors?: any
}
export type PageContent<T> = {
  content: T
  page: number
  size: number
  sort: string
  totalElements: number
  totalPages: number
  numberOfElements: number
}

export type PageResponseApi<T> = {
  message: string
  traceId: string
  data: PageContent<T>
  errorCodes?: {
    code: string
    message: string
  }[]
}
