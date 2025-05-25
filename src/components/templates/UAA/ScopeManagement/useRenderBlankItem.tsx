import { useMediaQuery } from '@mui/material'

const useRenderBlankItem = () => {
  const matcheTablet = useMediaQuery('(min-width:640px)', { noSsr: true })
  const matcheDesktop = useMediaQuery('(min-width:1280px)', { noSsr: true })

  const getBlankNumber = (numberItem?: number) => {
    if (matcheDesktop && numberItem) {
      return 5 - (numberItem % 5)
    } else if (matcheTablet && numberItem) {
      return 3 - (numberItem % 3)
    }
    return 0
  }
  return { getBlankNumber }
}

export default useRenderBlankItem
