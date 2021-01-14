import React from 'react'
import { Heading, Text, VStack, Stack } from '@chakra-ui/core'

function InformationTab() {
  return (
    <>
      <VStack spacing={10}>
        <Heading mb={50}>Welcome to my first React + Chakra UI course</Heading>
        <Stack direction="row" align="center" spacing={20}>
          
        </Stack>
        <Text>We can create text easily with chakra</Text>
        <Text fontSize="3xl">Change font size</Text>
        <Text as="i" fontSize="5xl" color="purple.700">
          And change color too
        </Text>
      </VStack>
    </>
  )
}

export default InformationTab
