import { useState } from 'react'
import { Box, Stack, Typography, IconButton, Avatar, Divider, Button, Tabs, Tab, Grid } from '@mui/material'

import { ArrowArcLeft, Bell, CaretRight, Phone, Prohibit, Star, Trash, VideoCamera, X } from 'phosphor-react'

import { useDispatch } from "react-redux";
import { toggleSidebar, updateSidebarType } from '../../../redux/app/app.action';
import appActionTypes from '../../../redux/app/app.types';
import { faker } from '@faker-js/faker';
import AntSwitch from '../../AntSwitch';
import { SHARED_DOCS, SHARED_LINK, Chat_History } from '../../../data';
import Messages from '../Messages';
import { TextMsg } from '../MessageType';


const StarredMessages = () => {
  const dispatch = useDispatch()

 


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
                  <Typography variant='subtitle2'>Starred Messages</Typography>
              </Stack>
          </Box>

          

          {/* Body */}
          <Stack sx={{ 
              height: "100%", 
              position: "relative", 
              flexGrow: 1, 
              overflowY: "scroll",
              '::-webkit-scrollbar' : { display: 'none'}
              }} 
              p={3} spacing={3}
          >
              {
                Chat_History.map((chat, index) => (
                    <TextMsg chat={chat} key={index} menu={false} />
                ))
              }
          </Stack>
      </Stack>
    </Box>
    </>
)
}

export default StarredMessages
