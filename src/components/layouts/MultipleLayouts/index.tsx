import dynamic from 'next/dynamic'

const multipleLayout = {
  Layout1: dynamic(
    () =>
      import('@/components/layouts/MultipleLayouts/Layout1/index').then(
        (component) => component.Layout1
      ),
    {
      ssr: false,
      loading: () => <>...Loading...</>,
    }
  ),
  Layout2: dynamic(
    () =>
      import('@/components/layouts/MultipleLayouts/Layout2/index').then(
        (component) => component.Layout2
      ),
    {
      ssr: false,
      loading: () => <>...Loading...</>,
    }
  ),
  Layout3: dynamic(
    () =>
      import('@/components/layouts/MultipleLayouts/Layout3/index').then(
        (component) => component.Layout3
      ),
    {
      ssr: false,
      loading: () => <>...Loading...</>,
    }
  ),
}

export type LayoutTypes = keyof typeof multipleLayout

export default multipleLayout
