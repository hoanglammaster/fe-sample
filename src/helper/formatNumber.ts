export const formatNumber = (priceString: string | number, delimiter = '.') => {
  if (!priceString) {
    return 0
  }

  return priceString
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${delimiter}`)
}
