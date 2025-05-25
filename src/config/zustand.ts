import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { persist, createJSONStorage } from 'zustand/middleware'

interface LoadingUploadForm {
  isUploading: boolean
  setIsUploading: (val: boolean) => void
}

export const useUploadForm = create<LoadingUploadForm>()(
  devtools(
    (set) => ({
      isUploading: false,
      setIsUploading: (val: boolean) => set((state) => ({ isUploading: val })),
    }),
    {
      name: 'loading-upload-form',
    }
  )
)

interface UserInfo {
  userInfo?: any
  setUserInfo: (val?: any) => void
}

export const useUserInfo = create<UserInfo>()(
  devtools(
    (set) => ({
      userInfo: false,
      setUserInfo: (val?: any) => set((state) => ({ userInfo: val })),
    }),
    {
      name: 'user-info',
    }
  )
)

interface ErrorDialog {
  errorMsg?: string
  setErrorMsg: (val?: string) => void
}

export const useErrorDialog = create<ErrorDialog>()(
  devtools(
    (set) => ({
      errorMsg: undefined,
      setErrorMsg: (val?: string) => set((state) => ({ errorMsg: val })),
    }),
    {
      name: 'eror-dialog',
    }
  )
)

interface ErrorPage {
  isError: boolean
  setIsError: (val: boolean) => void
}

export const useErrorBoundary = create<ErrorPage>()(
  devtools(
    (set) => ({
      isError: false,
      setIsError: (val: boolean) => set((state) => ({ isError: val })),
    }),
    {
      name: 'eror-boundary',
    }
  )
)

interface HistoryPage {
  listHistory: string[]
  setHistory: (val: string[]) => void
}

export const useHistoryPage = create<HistoryPage>()(
  persist(
    (set) => ({
      listHistory: [],
      setHistory: (val: string[]) => set((state) => ({ listHistory: val })),
    }),
    {
      name: 'eror-boundary',
    }
  )
)

interface MenuRouteZustand {
  listMenuConfig: any[]
  setListMenuConfig: (val: string[]) => void
}

export const useMenuConfigList = create<MenuRouteZustand>()(
  persist(
    (set) => ({
      listMenuConfig: [],
      setListMenuConfig: (val: any[]) =>
        set((state) => ({ listMenuConfig: val })),
    }),
    {
      name: 'menu-route',
    }
  )
)
