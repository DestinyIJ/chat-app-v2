import { useState } from 'react'
import { Box, Stack, Typography, IconButton, Avatar, Divider, Button, Tabs, Tab, Grid } from '@mui/material'

import { ArrowArcLeft, Bell, CaretRight, Phone, Prohibit, Star, Trash, VideoCamera, X } from 'phosphor-react'

import { useDispatch } from "react-redux";
import { toggleSidebar, updateSidebarType } from '../../../redux/app/app.action';
import appActionTypes from '../../../redux/app/app.types';
import { faker } from '@faker-js/faker';
import AntSwitch from '../../AntSwitch';
import { SHARED_DOCS, SHARED_LINK } from '../../../data';
import { TextMsg } from "../MessageType"


const SharedMessages = () => {
  const [tabValue, setTabValue] = useState(0)
  const dispatch = useDispatch()

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }


  return (
    <>
      <Box sx={{
        width: 320,
        height: "100vh",
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.45)",
    }}>
      <Stack sx={{ height: "100%"}}>
          {/* Header */}
          <Box sx={{
              boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.45)",
              width: "100%",
          }}>
              <Stack
                  direction="row"
                  sx={{ height: "100%", p: 2 }}
                  alignItems="center"
                  spacing={3}
              > 
                  
                  <IconButton onClick={() => { dispatch(updateSidebarType(appActionTypes.SIDEBAR_TYPES.CONTACT))} }>
                      <ArrowArcLeft />
                  </IconButton>
                  <Typography variant='subtitle2'>Shared Messages</Typography>
              </Stack>
          </Box>

          {/* tabs */}
          <Tabs sx={{ px:2, pt:2}} value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Media" />
            <Tab label="Links" />
            <Tab label="Docs" />
          </Tabs>

          {/* Body */}
          <Stack sx={{ 
              height: "100%", 
              position: "relative", 
              flexGrow: 1, 
              overflowY: "scroll",
              '::-webkit-scrollbar' : { display: 'none'}
              }} 
              p={3} spacing={tabValue === 1 ? 1 : 3}
          >
              {
                (() => {
                  switch (tabValue) {
                    case 0:
                      return <Grid container spacing={2}>
                          {
                              [1,2,3,4,5,6,7,8].map((i) => (
                                  <Grid item xs={4} key={i}>
                                      <img src={faker.image.avatar()} alt={faker.name.fullName()} />
                                  </Grid>
                              ))
                          }
                        </Grid>
                    case 1:
                      return SHARED_LINK.map((message) => <TextMsg chat={message} />)
                    case 2:
                      return SHARED_DOCS.map((message) => <TextMsg chat={message} />)
                    default: 
                      break
                  }
                })()
              }
              
          </Stack>
      </Stack>
    </Box>
    </>
)
}

export default SharedMessages
