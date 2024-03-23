import { Box, Button, Flex, HStack, Text } from '@chakra-ui/react'
import React from 'react'

function Page({current,total,handleclick,handleclick1}) {
  return (
    
        <Flex  justifyContent={'center'} mt={2} >
            <Box display={'flex'} alignItems={'center'}><Button isDisabled={current===1} onClick={handleclick1}>Previous</Button>
            <Text m={5}>{current}</Text>
            <Button isDisabled={current===total || total===1} onClick={handleclick}>Next</Button></Box>

        </Flex>
    
  )
}

export default Page