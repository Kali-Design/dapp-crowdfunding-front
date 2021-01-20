/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { VStack, Heading, Box, Flex, Spacer, Container, Text, Stack, Input, InputGroup, InputRightAddon, Button } from '@chakra-ui/react'
//import { } from 'ethers'
import { Web3Context } from "web3-hooks"

import DepositCrowdfunding from '../../App'

function Application() {
  const [web3State, login] = useContext(Web3Context);
  const DepositCrowdFunding = useContext(DepositCrowdfunding)
  const [inputDeposit, setInputDeposit]= useState(null)
  const handleOnClickDeposit = async () => {
    try {
      const dps = await web3State.DepositCrowdFunding.Deposit(inputDeposit)
      const filter = DepositCrowdFunding.filters.amount()
      DepositCrowdFunding.once(filter)

    } catch (e) {
    }
  }

  return (
    <>
      <VStack spacing={10}>
        <Heading mb={50}>Application</Heading>
      </VStack>
        <Box>
          <Container>
            <Flex my={5}>
              <Text flex='1' textAlign='center'>Staking Balance</Text>
              <Spacer />
              <Text flex='1' textAlign='center'>Reward Balance</Text>
            </Flex>
            <Flex alignItems="center" mb={5}>
              <Text flex='1' textAlign='center'> ETH</Text>
              <Spacer />
              <Text flex='1' textAlign='center'> ETH</Text>
            </Flex>
          </Container>
        </Box>
        <VStack mt={10}>
          <Box borderWidth="1px" p={50} borderRadius={5}>
            <Flex mb={5}>
              <Text fontWeight="bold">Stake Token</Text>
              <Spacer />
              <Text > Balance : </Text>
            </Flex>
            <Stack spacing={4}>
              <InputGroup size="sm">
                <Input placeholder="0" />
                value={inputDeposit} onChange={(e) => { setInputDeposit(e.currentTarget.value) }}
                <InputRightAddon bg='blue.400' children="ETH" />
              </InputGroup>
              <Button colorScheme="blue" textTransform="uppercase" onClick={handleOnClickDeposit}>Stake !!!</Button>

              <Button variant="link" textTransform="uppercase">Un-Stake...</Button>

            </Stack>
          </Box>
        </VStack>

      
    </>

  )
}

export default Application



