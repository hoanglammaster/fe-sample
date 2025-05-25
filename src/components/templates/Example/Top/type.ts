export type Response = {
  GET: {
    name: string
    age: number
    test: string
    isActive: boolean
    isStatus: boolean
    radio1: string
    radio2: string
    textEditor: string
  }
}

export type RequestBody = {
  POST: {
    name: string
    option: string
    autoComplete: object[]
    isActive: boolean
    isStatus: boolean
    radio1: boolean
    radio2: string
    area: string
    textEditor: string
    imageUrl: string
    color: string
  }
}
