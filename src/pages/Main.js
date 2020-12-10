import React, { useEffect, useReducer } from 'react'
import {
  Heading,
  Text,
  VStack,
  Button,
  HStack,
  Box,
  Badge,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
// https://docs.ethers.io/v5/
import { ethers } from 'ethers'
// eslint-disable-next-line no-unused-vars
import { isConnected2MetaMask, sendTransaction, connect2Contract } from '../utils/eth-utils'
import {
    // eslint-disable-next-line no-unused-vars
    DepositCrowdFunding_address,
    // eslint-disable-next-line no-unused-vars
    DepositCrowdFunding_abi,
} from '../contracts/DepositCrowdfunding'
// réducteur pour mettre à jour l'état de web3: vérifier si web3 est injecté, s'il est connecté à MetaMask, obtenir le compte connecté, équilibrer ...
const web3Reducer = (state, action) => {
  switch (action.type) {
    case 'SET_isWeb3':
      return { ...state, isWeb3: action.isWeb3 }
    case 'SET_isEnabled':
      return { ...state, isEnabled: action.isEnabled }
    case 'SET_account':
      return { ...state, account: action.account }
    case 'SET_provider':
      return { ...state, provider: action.provider }
    case 'SET_network':
      return { ...state, network: action.network }
    case 'SET_signer':
      return { ...state, signer: action.signer }
    case 'SET_balance':
      return { ...state, balance: action.balance }
    case 'SET_CONTRACT_depositCrowdfunding':
        return { ...state, despositCrowdfunding: action.despositCrowdfunding}  
    default:
      throw new Error(`Unhandled action ${action.type} in web3Reducer`)
  }
}

const initialWeb3State = {
  isWeb3: false,
  isEnabled: false,
  account: ethers.constants.AddressZero,
  provider: null,
  signer: null,
  network: null,
  balance: '0',
  depositCrowdfunding: null,
}
// réducteur pour mettre à jour l'état spécifique de la Dapp: l'utilisateur choisit de se connecter à MetaMask pour le montant à donner
const dappReducer = (state, action) => {
  switch (action.type) {
    case 'SET_isConnecting':
      return { ...state, isConnecting: action.isConnecting }
    case 'SET_donateValue':
      return { ...state, donateValue: action.donateValue }
    default:
      throw new Error(`Unhandled action ${action.type} in dappReducer`)
  }
}
//Adresse donnant des Ethers
const initialDappState = {
  donateValue: 1,
  isConnecting: false,
  myAddr: '0x274E6FE67Fe1CbA1Ab80e27CEf1f660Ba0Ab0C6a',
}

function Main() {
  const [web3State, web3Dispatch] = useReducer(web3Reducer, initialWeb3State)
  const [dappState, dappDispatch] = useReducer(dappReducer, initialDappState)

  const handleOnConnect = () => {
    if (!web3State.isEnabled)
      dappDispatch({ type: 'SET_isConnecting', isConnecting: true })
  }

  // Vérifie si Web3 est injecté uniquement lors du montage
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      web3Dispatch({ type: 'SET_isWeb3', isWeb3: true })
    } else {
      web3Dispatch({ type: 'SET_isWeb3', isWeb3: false })
    }
  }, [])

  // Vérifier si déjà connecté à MetaMask lors du montage et quand isWeb3 de web3State change de valeur
  useEffect(() => {
    const isConnected = async () => {
      const account = await isConnected2MetaMask()
      if (account) {
        // si connecté définir le compte sur l'adresse connectée, sinon: else
        web3Dispatch({ type: 'SET_isEnabled', isEnabled: true })
        web3Dispatch({ type: 'SET_account', account: account })
      } else {
        web3Dispatch({ type: 'SET_isEnabled', isEnabled: false })
      }
    }
    // définir isEnabled / account uniquement si web3 est injecté (isWeb3 === true)
    if (web3State.isWeb3) {
      isConnected()
    }
  }, [web3State.isWeb3])

  // S'il n'est pas connecté à MetaMask, l'utilisateur se connecte en cliquant sur le bouton
  useEffect(() => {
    const connect2MetaMask = async () => {
      try {
        // Pop-up de MetaMask pour demander la connexion (méthode: "eth_requestAccounts"), le compte est un tableau avec une adresse dans une chaîne
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        web3Dispatch({ type: 'SET_isEnabled', isEnabled: true })
        web3Dispatch({ type: 'SET_account', account: accounts[0] })
      } catch (e) {
        web3Dispatch({
          type: 'SET_account',
          account: ethers.constants.AddressZero,
        })
        web3Dispatch({ type: 'SET_isEnabled', isEnabled: false })
      } finally {
        dappDispatch({ type: 'SET_isConnecting', isConnecting: false })
      }
    }
    /* appeler connect2MetaMask uniquement si web3 est injecté, pas déjà connecté et utilisateur
    cliqué sur le bouton pour se connecter (donc définir isConnecting sur true). Si ensemble connecté
    isEnabled à true et account, si l'erreur définie estEnabled à false et account to
    adresse initiale 0. Dans tous les cas, succès ou échec, fermer la phase de connexion
    (similaire au chargement) et définissez isConnecting sur false. */

    if (web3State.isWeb3 && dappState.isConnecting && !web3State.isEnabled) {
      connect2MetaMask()
    }
    // tableau de dépendances avec les variables de la clause if
  }, [web3State.isWeb3, dappState.isConnecting, web3State.isEnabled])

  // Se connecter au fournisseur via les méthodes ethers
  useEffect(() => {
    const connect2Provider = async () => {
      try {
          /* Créer un nouveau Web3Provider, qui encapsule un existant compatible Web3
        fournisseur externe (window.ethereum créé par MetaMask) et l'exposer
        en tant que fournisseur ethers.js qui peut ensuite être utilisé avec le reste du
        bibliothèque.*/
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        web3Dispatch({ type: 'SET_provider', provider: provider })
        const signer = provider.getSigner()
        /* Renvoie un JsonRpcSigner qui est géré par ce nœud Ethereum et a
        hérite de la méthode sendTransaction du signataire */
        web3Dispatch({ type: 'SET_signer', signer: signer })
        // https://docs.ethers.io/v5/api/providers/provider/#Provider-getBalance
        // Renvoie l'objet Network auquel ce fournisseur est connecté
        const network = await provider.getNetwork()
        web3Dispatch({ type: 'SET_network', network: network })
        // https://docs.ethers.io/v5/api/providers/provider/#Provider-getBalance
        // Renvoie le solde de l'adresse en wei sous la forme d'un grand nombre
        const _balance = await provider.getBalance(web3State.account)
        // https://docs.ethers.io/v5/api/utils/display-logic/#utils-formatEther
        /* parseEther (etherString) et formatEther (wei) sont utilisés pour
        convertir entre des représentations de chaîne (dans Ether), qui sont affichées sur ou
        saisie par l'utilisateur et les représentations Big Number qui peuvent avoir
        opérations mathématiques traitées en toute sécurité. */
        const balance = ethers.utils.formatEther(_balance)
        web3Dispatch({ type: 'SET_balance', balance: balance })
      } catch (e) {
        web3Dispatch({ type: 'SET_network', network: initialWeb3State.network })
        web3Dispatch({ type: 'SET_balance', balance: initialWeb3State.balance })
      }
    }
        // se connecter au fournisseur uniquement s'il est connecté à MetaMask et que le compte n'est pas l'adresse 0
    if (
      web3State.isEnabled &&
      web3State.account !== ethers.constants.AddressZero
    ) {
      connect2Provider()
    }
  }, [web3State.isEnabled, web3State.account])

  useEffect(() => {
    // Si nous sommes sur le réseau rinkeby et que le signataire est défini, connectez-vous au contrat DepositCrowdFunding
    if (
      web3State.isEnabled &&
      web3State.network &&
      web3State.network.chainId === 4 &&
      web3State.signer
    ) {
      // les informations du Smart Contract (adresse et ABI) valider par Metamask
      web3Dispatch({
        type: 'SET_CONTRACT_depositCrowdfunding',
        depositCrowdfunding: new ethers.Contract(
          // eslint-disable-next-line no-undef
          DepositCrowdfunding_address,
          // eslint-disable-next-line no-undef
          DepositCrowdfunding_abi,
          web3State.signer
        ),
      })
    }
    // Smart Contract Crowdfunding signer dans Metamask
  }, [web3State.signer, web3State.network, web3State.isEnabled])

  return (
    // Affichage de page frontend - Status de la page -information du compte utilisateur 
    <>
      <VStack>
        <Heading>Application de Crowdfunding en Ether</Heading>
        <Heading mb={10} size="lg">
          Les détails de votre compte avec Metamask
        </Heading>

        {!web3State.isWeb3 && <Text>Please install MetaMask</Text>}
      
        {web3State.isWeb3 && (
            <Box mb={3} alignItems="baseline">
              MetaMask est:{" "}
              {web3State.isEnabled ? (
                <Badge colorScheme="green">connecté</Badge>
              ) : (
                <Badge colorScheme="red">déconnecté</Badge>
              )}
            </Box>
          )}  
        {web3State.isEnabled &&
          web3State.network !== null &&
          web3State.account !== ethers.constants.AddressZero && (
            <>
              <Text color="green.500" mb={3}>
                connected to {web3State.network.name}
              </Text>
              <Text mb={3}>Votre N° de compte: {web3State.account}</Text>

              <Text mb={3}>Votre solde: {web3State.balance}</Text>

              {web3State.network && (
                <>
                  <Text mb={3}>La banque: {web3State.network.name}</Text>

                  <Text mb={3}>Identifiant: {web3State.network.chainId}</Text>
                </>
              )}

              <HStack>
                <NumberInput
                  value={dappState.donateValue}
                  defaultValue={initialDappState.donateValue}
                  precision={2}
                  step={0.04}
                  min={0}
                  max={web3State.balance}
                  onChange={(currentDonateValue) => {
                    dappDispatch({
                      type: 'SET_donateValue',
                      donateValue: currentDonateValue,
                    })
                  }}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Button colorScheme="blue"
                  onClick={async () =>
                    await sendTransaction(
                      web3State.signer,
                      web3State.provider,
                      {
                        to: dappState.myAddr,
                        value: ethers.utils.parseEther(dappState.donateValue),
                      }
                    )
                  }
                >
                  Donate {dappState.donateValue} ETH
                </Button>
              </HStack>
              <Text as="i">
                  Convertisseur 1 Ether vaut 490.52€ à la bourse actuellement, vous donnez environ : {" "}
                  {dappState.donateValue * 490} €
              </Text>
            </>
          )}
        {!web3State.isEnabled && (
          <Button colorScheme="blue" onClick={handleOnConnect}>Se connecter</Button>
        )}
      </VStack>
    </>
  )
}

export default Main
