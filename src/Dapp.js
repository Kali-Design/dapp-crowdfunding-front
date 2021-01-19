/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useContext, useState, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { Text, Button, HStack, Input, useToast } from '@chakra-ui/react'
// eslint-disable-next-line no-unused-vars
import { Web3Context } from 'web3-hooks'
import { DepositCrowdfundingContext } from './App'


function Dapp() {
  const [web3State, login] = useContext(Web3Context)
  const depositCrowdfunding = useContext(DepositCrowdfundingContext)
  const toast = useToast()

  const [getValue, setGetValue] = useState(0)
  const [inputValue, setInputValue] = useState(0)

  useEffect(() => {
    if (depositCrowdfunding) {
      const cb = (from, value) => {
        toast({
          position: 'bottom',
          title: `SET`,
          description: `set value: ${value} by ${from}`,
          status: 'success',
          duration: 10000,
          isClosable: true,
        })
      }
      console.log('USEEFFECT CALLED FOR TOAST')
      depositCrowdfunding.transfer('transfer', cb)
      return () => {
        console.log('USEEFFECT CLEANUP FOR TOAST')
        depositCrowdfunding.withdraw('withdraw', cb)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depositCrowdfunding, toast])

  const handleOnClickGet = async () => {
    try {
      const res = await depositCrowdfunding.get()
      setGetValue(res.toString())
    } catch (e) {
      console.log(e.message)
    }
  }

  const handleOnClickSet = async () => {
    console.log('nb listeners:', depositCrowdfunding.deposit())
    try {

      const cb = (_from, value) => {
        setInputValue(value.toString())
      }
      const filter = depositCrowdfunding.filters.withdraw(web3State.account, null)

      // Ecoute une fois event StorageSet
      depositCrowdfunding.once(filter, cb)
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <>
      {!web3State.isLogged && (
        <>
          <Button onClick={login}>login</Button>
        </>
      )}
      {depositCrowdfunding && web3State.chainId === 4 && (
        <>
          <HStack>
            <Button onClick={handleOnClickGet}>GET</Button>
            <Text>{getValue}</Text>
          </HStack>
          <HStack>
            <Button onClick={handleOnClickSet}>SET</Button>
            <Input
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.currentTarget.value)
              }}
            />
          </HStack>
        </>
      )}
    </>
  )
}

export default Dapp
