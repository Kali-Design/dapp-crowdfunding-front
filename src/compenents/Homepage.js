import React from 'react'
import { Heading, Box, Button, Link, VStack } from '@chakra-ui/react'
import Footer from './Footer'
import Navbar from './Navbar'


function Homepage() {
  return (
    <>
      <Navbar />

      <Box py={10} fontFamily="Montserrat">
        <VStack>

          <Heading  size="lg" fontSize="70px">CROWDFUNDING AIDE HUMANITAIRE </Heading>


        </VStack>
      </Box>
      <VStack>
        <Button mb={4} name="button" _hover={{
          bg: "teal.500",
          color: "white",
        }} bg="green.400" color="white" textTransform='uppercase'>
          <Link to="/register">Register</Link>
        </Button>
      </VStack>
      <Footer />
    </>
  )
}

export default Homepage
