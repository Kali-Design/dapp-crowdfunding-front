import React from 'react'
import { Link } from 'react-router-dom';
import { Heading, Box, Button, VStack, Text } from '@chakra-ui/react'
import Footer from './Footer'
import Navbar from './Navbar'



function Homepage() {
  return (
    <>
      <Navbar />

      <Box p={130} fontFamily="Montserrat">
        <VStack>
        <Text size="lg" fontSize={25}>Welcome to the Blockchain</Text>
        
          <Heading size="lg" fontSize="60px">CROWDFUNDING AIDE HUMANITAIRE ☘️</Heading>
         
          <Text fontSize={25}></Text>


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
