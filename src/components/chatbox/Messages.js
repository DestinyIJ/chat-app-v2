import React from 'react'
import { Box, Stack } from '@mui/material'

import { Chat_History } from '../../data'
import { TextMsg, TimeLine } from './MessageType'

const Messages = () => {
  return (
    <Box p={3}>
      <Stack spacing={3}>
        {
          Chat_History.map((chat, index) => {
            switch (chat.type) {
              case "divider":
                return <TimeLine chat={chat} key={index} />
              case "msg":
                return <TextMsg chat={chat} key={index} />
              default:
                return <></>
            }
          })
        }
      </Stack>
    </Box>
  )
}

export default Messages