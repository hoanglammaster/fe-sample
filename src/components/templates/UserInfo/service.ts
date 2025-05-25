import { authUAAAPI } from '@/config/axiosConfig'

export const uploadUserAvatar = (data: any, params = {}) => {
  return authUAAAPI({
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: '/cms/api/v1/user/avatar',
    data,
    params,
    isFileUpload: true,
  })
}

export const updateUserInfo = (data: any) => {
  return authUAAAPI({ method: 'put', url: 'api/v1/user', data })
}

export const updateCurentUserPassword = (data: any) => {
  return authUAAAPI({
    method: 'put',
    url: 'api/v1/user/change-password',
    data,
  })
}

export const UTC_TIME_LIST = [
  {
    id: '1',
    name: 'UTC-11:00',
  },
  {
    id: '2',
    name: 'UTC-10:00',
  },
  {
    id: '3',
    name: 'UTC-09:00',
  },
  {
    id: '4',
    name: 'UTC-08:00',
  },
  {
    id: '5',
    name: 'UTC-07:00',
  },
  {
    id: '6',
    name: 'UTC-06:00',
  },
  {
    id: '7',
    name: 'UTC-05:00',
  },
  {
    id: '8',
    name: 'UTC-04:00',
  },
  {
    id: '9',
    name: 'UTC-03:00',
  },
  {
    id: '10',
    name: 'UTC-02:00',
  },
  {
    id: '11',
    name: 'UTC-01:00',
  },
  {
    id: '12',
    name: 'UTC 00:00',
  },
  {
    id: '13',
    name: 'UTC+01:00',
  },
  {
    id: '14',
    name: 'UTC+02:00',
  },
  {
    id: '15',
    name: 'UTC+03:00',
  },
  {
    id: '16',
    name: 'UTC+0+0:00',
  },
  {
    id: '17',
    name: 'UTC+05:00',
  },
  {
    id: '18',
    name: 'UTC+06:00',
  },
  {
    id: '19',
    name: 'UTC+07:00',
  },
  {
    id: '20',
    name: 'UTC+08:00',
  },
  {
    id: '21',
    name: 'UTC+09:00',
  },
  {
    id: '22',
    name: 'UTC+10:00',
  },
  {
    id: '23',
    name: 'UTC+11:00',
  },
]
