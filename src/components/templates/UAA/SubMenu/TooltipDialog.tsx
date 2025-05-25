import { showCodeNameOption } from '@/helper/utils'
import { Box } from '@mui/material'
type Props = {
  item: any
  t: any
}

export const TooltipDialog = (props: Props) => {
  const { item, t } = props

  return (
    <Box>
      <div className='w-70 text-[#242424] text-sm font-bold mb-4'>
        {t('label.action')}
      </div>
      <Box>
        {(item ?? []).map(
          (v: any) => {
            return (
              <div className='w-70 mb-2 text-[#222222] text-sm' key={v?.id}>
                {showCodeNameOption(v?.code, v?.name)}
              </div>
            )
          }
        )}
      </Box>
    </Box>
  )
}
