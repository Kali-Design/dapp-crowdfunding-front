import { ethers } from 'ethers'


// Si connecté à MetaMask renvoie le compte actuel
// sinon retourne null
export const isConnected2MetaMask = async () => {
  // Si les comptes non connectés seront un tableau vide
  const accounts = await window.ethereum.request({
    method: 'eth_accounts',
  })
  if (accounts.length === 0) {
    return null
  }
  return accounts[0]
}

// envoyer `transaction`, donc ethers, depuis l'adresse du signataire
export const sendTransaction = async (signer, provider, transaction) => {
  try {
    // envoie la transaction et renvoie une réponse de transaction
    const tx = await signer.sendTransaction(transaction)
    // attend que tx.hash soit miné avec 3 validation de bloc et un délai d'expiration de 120 secondes
    // en cas de succès renvoie un accusé de réception de la transaction
    const receipt = await provider.waitForTransaction(tx.hash, 3, 120000)
    return receipt
  } catch (e) {
    return null
  }
}
// Export du Smart Contract DepositCrowdfunding ABI & ADRESSE et SIGNATURE
export const connect2Contract = (address, abi, signer) => {
  // eslint-disable-next-line no-undef
  return new ethers.Contract(address, abi, signer)
}
