import React from 'react'
import { Text, Box, Image, Flex } from '@chakra-ui/react'
import Facebook from '../assets/facebook.svg'
import Twitter from '../assets/twitter.svg'
import Linkedin from '../assets/linkedin.svg'

function Footer() {
  return (

    <Box py={10} bg="brand.900" fontFamily="Montserrat">

      <Flex justifyContent="center" p={5} fontFamily="Montserrat">
        <Box>
          <Image mx={5} borderRadius="full" boxSize="32px" objectFit="cover" src={Facebook} alt="Facebook" />
        </Box>
        <Box>
          <Image mx={5} borderRadius="full" boxSize="32px" objectFit="cover" src={Twitter} alt="Twitter" />
        </Box>
        <Box>
          <Image mx={5} borderRadius="full" boxSize="32px" objectFit="cover" src={Linkedin} alt="Linkedin" />
        </Box>
      </Flex>
      <Text textAlign="center" color="white" >Crowdfunding aide humanitaire</Text>
    </Box>


  )
}

export default Footer
