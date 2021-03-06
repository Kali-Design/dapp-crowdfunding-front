import { ethers } from 'ethers'
// eslint-disable-next-line no-unused-vars
import { useState, useEffect, useContext } from 'react'
import { Web3Context } from "web3-hooks"

export const useContract = (address, abi) => {
  // eslint-disable-next-line no-unused-vars
  const [web3State, _] = useContext(Web3Context)
  const [contract, setContract] = useState(null)
  useEffect(() => {
    if (web3State.signer) {
      setContract(new ethers.Contract(address, abi, web3State.signer))
    } else {
      setContract(null)
    }
  }, [web3State.signer, address, abi])
  return contract
}
