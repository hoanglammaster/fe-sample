import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link'

interface Props {
  name: string
  path?: string
  isChecked: boolean
}

const MenuItem = (props: Props) => {
  const { isChecked, name, path } = props

  return (
    <Box style={{ padding: '0px 4px' }}>
      <Link
        href={path ?? '/'}
        style={{
          textDecoration: 'none',
          width: '100%',
        }}
      >
        <Button
          color='primary'
          style={{
            color: isChecked ? 'white' : 'black',
          }}
          variant={isChecked ? 'contained' : 'text'}
          disableElevation
        >
          <Box
            height={40}
            alignItems='center'
            justifyContent='start'
            paddingRight='32px'
            paddingLeft='10px'
            style={{
              display: 'flex',
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
            }}
          >
            <Box
              style={{
                display: 'flex',
                flexDirection: 'row',
                flex: 1,
                alignItems: 'center',
              }}
            >
              <Typography variant='body2' textAlign='initial'>
                {name}
              </Typography>
            </Box>
          </Box>
        </Button>
      </Link>
    </Box>
  )
}

export default MenuItem
