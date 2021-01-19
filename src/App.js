/* eslint-disable react/jsx-no-undef */
import React from 'react'
import {
  DepositCrowdFunding_address,
  DepositCrowdFunding_abi,
} from './contracts/DepositCrowdfunding'
import { useContract } from 'web3-hooks'
//import Dapp from './Dapp'

//import Homepage from './compenents/Homepage'
import Dest from './Dest'


export const DepositCrowdfundingContext = React.createContext(null)

function App() {
  const depositCrowdfunding = useContract(DepositCrowdFunding_address, DepositCrowdFunding_abi)

  return (

    <DepositCrowdfundingContext.Provider value={depositCrowdfunding}>
      
      <Dest />
    
      
      
    </DepositCrowdfundingContext.Provider>

  )
}

export default App

