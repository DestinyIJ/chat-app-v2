import React from 'react'
import { Box, Stack } from '@mui/material'

import { Chat_History } from '../../data'
import { TextMsg, TimeLine } from './MessageType'

const Messages = () => {
  return (
    <Box p={3}>
      <Stack spacing={3}>
        {
          Chat_History.map((chat) => {
            switch (chat.type) {
              case "divider":
                return <TimeLine chat={chat} />
              case "msg":
                return <TextMsg chat={chat} />
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