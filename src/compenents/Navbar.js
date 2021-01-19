/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Box, Flex, Spacer, Text, useDisclosure } from '@chakra-ui/react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Portal,
  PopoverCloseButton,
} from "@chakra-ui/react"

import { Web3Context } from "web3-hooks"


function Navbar() {

  //const depositCrowdfunding = useContext(DepositCrowdfundingContext)
  const [web3State, login] = useContext(Web3Context)

  const { isOpen, onOpen, onClose } = useDisclosure()


  return (
    <>
      <Flex bg="blue.400" fontFamily="Montserrat ">

        <Spacer />

        <Box my={12} as="samp" fontFamily="Montserrat" fontSize="12px" mr={6}>
          <Popover>
            <PopoverTrigger>
              <Button ml={2} name="button" _hover={{
                bg: "teal.500",
                color: "white",
              }} bg="green.400" color="white" textTransform='uppercase'>Account Status</Button>
            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <PopoverArrow />
                <PopoverBody>
                  <Text fontFamily="Montserrat" fontWeight='bold'>Blockchain: {web3State.is_web3 ? (<Text color="green.500">injected ✅ </Text>
                  ) : (
                      <Text color="red.500">not found 🛑 </Text>
                    )}</Text>
                  <Text fontFamily="Montserrat" fontWeight='bold'>Wallet: {web3State.is_logged ?
                    <Text color="green.500">{web3State.is_metamask} ✅ </Text>
                    :
                    <Text color="red.500">{web3State.is_metamask} 🛑 </Text>}</Text>
                  <Text fontFamily="Montserrat" fontWeight='bold'>Network name: {web3State.network_name}</Text>
                  <Text fontFamily="Montserrat" fontWeight='bold'>Network id: {web3State.chain_id}</Text>
                  <Text fontFamily="Montserrat" fontWeight='bold'>Account: {web3State.account}</Text>
                  <Text fontFamily="Montserrat" fontWeight='bold'>Balance: {web3State.balance}</Text>
                </PopoverBody>
                <PopoverCloseButton />
              </PopoverContent>
            </Portal>
          </Popover>
          <Button ml={5}
            name="button" _hover={{
              bg: "teal.500",
              color: "white",
            }} bg="green.400" color="white" textTransform='uppercase'>
            <Link to="/login">Sign In</Link>
          </Button>
        </Box>
      </Flex>
    </>)
}

export default Navbar
