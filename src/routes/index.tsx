import Image from 'next/image'
import { ReactNode } from 'react'

export interface MenuPathProps {
  id?: number
  name: string
  type: 'item' | 'group' | 'collapse'
  path?: string
  children?: MenuPathProps[]
  icon?: ReactNode
}
export const UAA_PATH = '/uaa'
export const UAA_TRANSLATE_PATH = 'uaa'

export const TRANSLATE_UAA = {
  ACTION_MANAGEMENT: `${UAA_TRANSLATE_PATH}/action-management`,
  PERMISSION_CONFIG: `${UAA_TRANSLATE_PATH}/permission-config`,
  SYSTEM_MANAGEMENT: `${UAA_TRANSLATE_PATH}/system-management`,
  API_MANAGEMENT: `${UAA_TRANSLATE_PATH}/api-management`,
  SERVICE: `${UAA_TRANSLATE_PATH}/service`,
  FEATURE: `${UAA_TRANSLATE_PATH}/feature`,
  USER: `${UAA_TRANSLATE_PATH}/user`,
  CONFIGURATION_MENU: `${UAA_TRANSLATE_PATH}/menu`,
  CONFIG_DISPLAY_SYSTEM: `${UAA_TRANSLATE_PATH}/config-display-system`,
  SCREEN_DASHBOARD: `${UAA_TRANSLATE_PATH}/screen-dashboard`,
  MENU: `${UAA_TRANSLATE_PATH}/menu`,
  CONFIG_ROLE_TYPE: `${UAA_TRANSLATE_PATH}/config-role-type`,
  CONFIG: `${UAA_TRANSLATE_PATH}/config-setup`,
  CLIENT: `${UAA_TRANSLATE_PATH}/client`,
  SCOPE: `${UAA_TRANSLATE_PATH}/scope`,
  CLIENT_SCOPE_MAPPING: `${UAA_TRANSLATE_PATH}/client-scope-mapping`,
  ROLE_TYPE_PERMISSION_MAPPING: `${UAA_TRANSLATE_PATH}/role-type-permission-mapping`,
  SUB_MENU_MANAGEMENT: `${UAA_TRANSLATE_PATH}/sub-menu-management`,
}

export const UAA_CHILDREN_PATH = {
  ACTION_MANAGEMENT: `${UAA_PATH}/action-management`,
  PERMISSION_CONFIG: `${UAA_PATH}/permission-config`,
  CREATE_PERMISSION_CONFIG: `${UAA_PATH}/permission-config/:id`,
  USER_MANAGEMENT: `${UAA_PATH}/user-management`,
  SYSTEM_MANAGEMENT: `${UAA_PATH}/system-management`,
  COMPANY_PERMISSION: `${UAA_PATH}/company-permission`,
  API_MANAGEMENT: `${UAA_PATH}/api-management`,
  SERVICE: `${UAA_PATH}/service`,
  FEATURE: `${UAA_PATH}/feature`,
  CONFIGURATION_MENU: `${UAA_PATH}/config-menu`,
  CONFIG_DISPLAY_SYSTEM: `${UAA_PATH}/config-dashboard`,
  CONFIG_ROLE_TYPE: `${UAA_PATH}/config-role-type`,
  CONFIG: `${UAA_PATH}/config-setup`,
  CLIENT_MANAGEMENT: `${UAA_PATH}/client-management`,
  SCOPE_MANAGEMENT: `${UAA_PATH}/scope-management`,
  SYSTEM_FEATURE_MAPPING: `${UAA_PATH}/system-feature-mapping`,
  CLIENT_SCOPE_MAPPING: `${UAA_PATH}/client-scope-mapping`,
  ROLE_TYPE_PERMISSION_MAPPING: `${UAA_PATH}/role-type-permission-mapping`,
  SUB_MENU_MANAGEMENT: `${UAA_PATH}/sub-menu-management`,
}

export const listMenuRoutes: MenuPathProps[] = [
  {
    name: 'Service Management',
    type: 'item',
    path: UAA_CHILDREN_PATH.SERVICE,
    icon: <Image alt='' src={require('@/assets/svg/menu/service.svg')} />,
  },
  {
    name: 'API Management',
    type: 'item',
    path: UAA_CHILDREN_PATH.API_MANAGEMENT,
    icon: <Image alt='' src={require('@/assets/svg/menu/api.svg')} />,
  },
  {
    name: 'System Management',
    type: 'item',
    path: UAA_CHILDREN_PATH.SYSTEM_MANAGEMENT,
    icon: <Image alt='' src={require('@/assets/svg/ography.svg')} />,
  },
  {
    name: 'Feature Management',
    type: 'item',
    path: `${UAA_CHILDREN_PATH.FEATURE}`,
    icon: <Image alt='' src={require('@/assets/svg/menu/feature.svg')} />,
  },
  //
  // {
  //   name: 'System - Feature Mapping',
  //   type: 'item',
  //   path: UAA_CHILDREN_PATH.SYSTEM_FEATURE_MAPPING,
  //   icon: <Image alt='' src={require('@/assets/svg/menu/api.svg')} />,
  // },

  {
    name: 'Permission Group Management',
    type: 'item',
    path: UAA_CHILDREN_PATH.PERMISSION_CONFIG,
    icon: (
      <Image
        alt=''
        width={20}
        src={require('@/assets/svg/menu/permission.svg')}
      />
    ),
  },
  {
    name: 'Role Type - Permission Group Mapping',
    type: 'item',
    path: `${UAA_CHILDREN_PATH.ROLE_TYPE_PERMISSION_MAPPING}`,
    icon: <Image alt='' src={require('@/assets/svg/ography.svg')} />,
  },
  {
    name: 'User Management',
    type: 'item',
    path: UAA_CHILDREN_PATH.USER_MANAGEMENT,
    icon: <Image alt='' src={require('@/assets/svg/menu/user.svg')} />,
  },
  {
    name: 'Menu Config Management',
    type: 'item',
    path: `${UAA_CHILDREN_PATH.CONFIGURATION_MENU}`,
    icon: <Image alt='' src={require('@/assets/svg/ography.svg')} />,
  },
  // {
  //   name: 'Dashboard management',
  //   type: 'item',
  //   path: `${UAA_CHILDREN_PATH.CONFIG_DISPLAY_SYSTEM}`,
  //   icon: <Image alt='' src={require('@/assets/svg/ography.svg')} />,
  // },
  // {
  //   name: 'Config',
  //   type: 'item',
  //   path: `${UAA_CHILDREN_PATH.CONFIG}`,
  //   icon: <Image alt='' src={require('@/assets/svg/menu/service.svg')} />,
  // },
  {
    name: 'Client Management',
    type: 'item',
    path: `${UAA_CHILDREN_PATH.CLIENT_MANAGEMENT}`,
    icon: <Image alt='' src={require('@/assets/svg/menu/client.svg')} />,
  },
  {
    name: 'Scope Management',
    type: 'item',
    path: `${UAA_CHILDREN_PATH.SCOPE_MANAGEMENT}`,
    icon: <Image alt='' src={require('@/assets/svg/menu/scope.svg')} />,
  },
  {
    name: 'Client - Scope Mapping',
    type: 'item',
    path: `${UAA_CHILDREN_PATH.CLIENT_SCOPE_MAPPING}`,
    icon: <Image alt='' src={require('@/assets/svg/menu/scope.svg')} />,
  },
  {
    name: 'Sub Menu Management',
    type: 'item',
    path: `${UAA_CHILDREN_PATH.SUB_MENU_MANAGEMENT}`,
    icon: <Image alt='' src={require('@/assets/svg/menu/scope.svg')} />,
  },
  {
    name: 'Action Management',
    type: 'item',
    path: `${UAA_CHILDREN_PATH.ACTION_MANAGEMENT}`,
    icon: <Image alt='' src={require('@/assets/svg/menu/scope.svg')} />,
  },
  {
    name: 'System Config Management',
    type: 'item',
    path: `${UAA_CHILDREN_PATH.CONFIG}`,
    icon: <Image alt='' src={require('@/assets/svg/menu/scope.svg')} />,
  },
]
