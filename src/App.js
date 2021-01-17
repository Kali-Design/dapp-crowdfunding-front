/* eslint-disable react/jsx-no-undef */
import React from 'react'
import {
  DepositCrowdFunding_address,
  DepositCrowdFunding_abi,
} from './contracts/DepositCrowdfunding'
import { useContract } from 'web3-hooks'
import Dapp from './Dapp'
import Login from './compenents/Login'

export const DepositCrowdfundingContext = React.createContext(null)

function App() {
  const depositCrowdfunding = useContract(DepositCrowdFunding_address, DepositCrowdFunding_abi)

  return (

    <DepositCrowdfundingContext.Provider value={depositCrowdfunding}>
      <Dapp />
      <Login />
      
    </DepositCrowdfundingContext.Provider>

  )
}

export default App

