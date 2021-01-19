import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Information from './SpacePersonal/Information'
import Register from './SpacePersonal/Register'
import Application from './SpacePersonal/Application'


function Personal() {
  return (
    <>
      <Tabs colorScheme="purple" size="lg" isFitted={true}>
        <TabList>
          <Tab>Information</Tab>
          <Tab>Register</Tab>
          <Tab>Application</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Information />
          </TabPanel>
          <TabPanel>
            <Register />
          </TabPanel>
          <TabPanel>
            <Application />
          </TabPanel>

        </TabPanels>
      </Tabs>
    </>
  )
}

export default Personal
