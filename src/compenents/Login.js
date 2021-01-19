import React from 'react'
import { Link } from 'react-router-dom';
import {
  ThemeProvider,
  theme,
  CSSReset,
  Flex,
  Box,
  useColorMode,
  Heading,
  IconButton,
  Text,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Checkbox,
  Button,
} from '@chakra-ui/react'


// eslint-disable-next-line no-unused-vars
const VARIANT_COLOR = 'teal'

function login() {
  return (
    <>
      <ThemeProvider theme={theme}>

        <CSSReset />
        <LoginArea />

      </ThemeProvider>
    </>
  )
}

const LoginArea = () => {
  return (
    <Flex minHeigh='100vh' width='full' align='center' justifyContent='center'>
      <Box mt={20} borderWidth={1} px={4} width='full' maxWidth='500px' borderRadius={4} textAlign='center' boxShadow='lg'>
        <ThemeSelector />
        <Box p={4} >
          <LoginHeader />
          <LoginForm />
        </Box>
      </Box>
    </Flex>
  )
}

const ThemeSelector = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Box textAlign='right' py={4}>
      <IconButton icon={colorMode === 'light' ? 'moon' : 'sun'} onClick={toggleColorMode} variant='ghost' />
    </Box>
  )
}

const LoginHeader = () => {
  return (
    <Box textAlign='center'>
      <Heading>Sign in to your account</Heading>
      <Text>
        Or <Link color={`${VARIANT_COLOR}.500`}>Start your 14 days trial</Link>
      </Text>
    </Box>
  )
}

export const LoginForm = () => {
  return (
    <Box my={8} textAlign='left'>
      
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input type='email' placeholder='Enter your email address' />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <Input type='Password' placeholder='Enter your password' />
        </FormControl>

        <Stack isInline justifyContent='space-between' mt={4}>
          <Box>
            <Checkbox>
              Remenber Me
            </Checkbox>
          </Box>
          <Box>
            <Link color={`${VARIANT_COLOR}.500`}>
              Forgot your Password ?
            </Link>
          </Box>
        </Stack>

        <Button variantColor={VARIANT_COLOR} width="full" mt={4}>
        <Link to="/application">Sign In</Link>
        </Button>
         <center>       
        <Text fontSize={15}>By clicking Register and Subscribe, you agree to Crowdfunding Terms of Service, Privacy Policy.</Text>
        </center>  
    </Box>
  )
}

export default login
