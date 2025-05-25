export function trimObject(obj: {}) {
  const trim: any = {}
  Object.entries(obj).forEach((v: any) => {
    trim[`${v[0]}`] = typeof v[1] === 'string' ? v[1].trim() : v[1]
  })
  return trim
}
