export const DepositCrowdFunding_address = '0xcDf4C8AC61eE80c55367CE347742766a6Ea3C0D2'

export const DepositCrowdFunding_abi = [
  {
    "inputs": [],
    "name": "last_completed_migration",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "completed",
        "type": "uint256"
      }
    ],
    "name": "setCompleted",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
