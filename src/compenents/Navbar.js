/* eslint-disable no-unused-vars */
/*import React, { useContext, useState } from 'react'
import { Button, Box, Flex, Spacer, Text } from '@chakra-ui/react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Portal,
  PopoverCloseButton,
} from "@chakra-ui/react"

function Navbar() {

  const wallet = new Web3(Web3.givenProvider)
  console.log(Web3.givenProvider)

  const depositCrowdfunding= useContext(DepositCrowdfundingContext)
  const [web3State, login] = useContext(Web3Context)

  const [inputAnimalById, setInputAnimalById] = useState(null)
  const [getValueAnimalById, setGetValueAnimalById] = useState(null)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

      return (
    <>
      <Flex fontFamily="Montserrat ">
        <Box py={3}>
          <Link to="/">
            <Image boxSize="100px" objectFit="cover" src={Logo} alt="logo noé" />
          </Link>
        </Box>
        <Spacer />

        <Box my={12} as="samp" fontFamily="Montserrat " fontSize="12px" mr={6}>
          <Popover>
            <PopoverTrigger>
              <Button name="button" _hover={{
                bg: "teal.500",
                color: "white",
              }} bg="brand.100" color="white" textTransform='uppercase'>Provider Status</Button>
            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <PopoverArrow />
                <PopoverBody>
                  <Text fontWeight='bold'>Web3: {web3State.is_web3 ? (<Text color="green.500">injected ✅ </Text>
                  ) : (
                      <Text color="red.500">not found 🛑 </Text>
                    )}</Text>
                  <Text fontWeight='bold'>Wallet: {web3State.is_logged ?
                    <Text color="green.500">{web3State.is_metamask} ✅ </Text>
                    :
                    <Text color="red.500">{web3State.is_metamask} 🛑 </Text>}</Text>
                  <Text fontWeight='bold'>Network name: {web3State.network_name}</Text>
                  <Text fontWeight='bold'>Network id: {web3State.chain_id}</Text>
                  <Text fontWeight='bold'>Account: {web3State.account}</Text>
                  <Text fontWeight='bold'>Balance: {web3State.balance}</Text>
                </PopoverBody>
                <PopoverCloseButton />
              </PopoverContent>
            </Portal>
          </Popover>
    </>
}

export default Navbar*/
