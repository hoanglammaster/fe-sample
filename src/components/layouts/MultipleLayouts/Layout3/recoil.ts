import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()

export const isOpenSidebar = atom({
  key: 'layout2/isOpenSidebar',
  default: true,
  effects_UNSTABLE: [persistAtom],
})
