import { Box, CircularProgress } from '@chakra-ui/react'
import React from 'react'

const Loading = () => {
  return (
    <Box margin={100}><CircularProgress isIndeterminate color='green.300' /></Box>
  )
}

export default Loading