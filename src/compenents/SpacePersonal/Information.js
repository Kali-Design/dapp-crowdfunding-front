import React from 'react'
import { Link } from 'react-router-dom';
import { Heading, Text, VStack, Stack, Checkbox, Box, Button, Center } from '@chakra-ui/react'

function Information() {
  return (
    <>
      <VStack spacing={10}>
        <Heading mb={50}> Information </Heading>
        <Stack direction="row" align="center" spacing={20}>

          <Text fontSize={25}></Text>
          <Stack>
            <Box>
              <Text fontSize={25}>Le financement participatif du Smart Contract Crowdfunding Aide Humanitaire sont des contrats d’assurances qui permettent aux projets de collecter des fonds auprès d'un groupe de personnes sur la base d'un concept simple : pendant une période de financement participatif fixe, des particuliers promettent des Ethers dans le but de lever un montant total répondant à un objectif fixe d'aide humanitaire. Si les engagements atteignent l'objectif, les fonds sont transférés au projet afin qu'il puisse se réaliser. Si les engagements sont insuffisants, les Ethers sont remboursés aux particuliers.</Text>
            </Box>
          </Stack>
    
        </Stack>
        Stack isInline justifyContent='space-between' mt={4}

        <Box>
        <Checkbox>
          <Text as="i" fontSize="l" color="blue.400">
          Conditions générales
        </Text>
        </Checkbox>
      </Box>


      <Box>
        <Checkbox>
          <Text as="i" fontSize="l" color="blue.400">
            CGU
        </Text>
        </Checkbox>
      </Box>
      <Center>
        <Button>
          <Link to="/Application">Agree</Link>
        </Button>
      </Center>

    </VStack>
    </>
  )
}

export default Information
