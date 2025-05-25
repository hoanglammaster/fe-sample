export interface ConfigRoleTypeInterface {
  id: number
  systemId?: number
  roleTypeId?: number | null
  tierId?: number
  groupPermissionIds: number[]
}
