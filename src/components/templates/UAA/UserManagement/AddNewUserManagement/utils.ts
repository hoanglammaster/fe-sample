export const changeRoleToProduct = (val: any[]) => {
  let products: any[] = []
  if (val?.length > 0) {
    val.forEach((element: any) => {
      if (products.some((v: any) => v.id === element.systemId)) {
        products = products.map((item2: any) => {
          return item2.id !== element.systemId
            ? item2
            : { ...item2, roles: [...item2.roles, element.id] }
        })
      } else
        products = products.concat({
          id: element.systemId,
          roles: [element.id],
        })
    })
  } else products = [{}]
  return products
}
