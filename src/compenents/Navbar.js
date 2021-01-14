import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/core'
import LoginTab from '../compenents/LoginTab'
import InformationTab from '../compenents/InformationTab'

function Navbar() {
  return (
    <>
      <Tabs colorScheme="purple" size="lg" isFitted={true}>
        <TabList>
          <Tab>Information</Tab>
          
          <Tab>Login</Tab>
          
          
        </TabList>
        <TabPanels>
          <TabPanel>
            <InformationTab/>
          </TabPanel>
          <TabPanel>
            <LoginTab/>
          </TabPanel>
          <TabPanel>
            
          </TabPanel>
          <TabPanel>
            
          </TabPanel>
          <TabPanel>
            
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default Navbar
