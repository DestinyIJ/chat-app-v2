import { Avatar, Box, IconButton, Stack, styled, Typography, useTheme } from '@mui/material'
import { Chat } from 'phosphor-react'
import React from 'react'
import { socket } from '../../utils/socket'
import StyledBadge from '../StyledBadge'

const StyledChatBox = styled(Box)(({ theme }) => ({
  "&:hover" : {
    cursor: "pointer"
  }
}))

const FriendComponent = ({ firstName, lastName, _id, online, avatar }) => {
  const theme = useTheme()

  const handleSetConversation = (id) => {

  }

  return (
    <>
      <StyledChatBox
        p={2}
        sx={{
          width: "100%",
          borderRadius: 1,
          backgroundColor: theme.palette.background.paper
        }}
      >
        <Stack direction="row" alignItems={"center"} justifyContent="space-between">
          <Stack direction="row" alignItems={"center"} spacing={2}>
            {
              online ? (
                <StyledBadge
                  overlap='circular'
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                  }}
                  variant="dot"
                >
                  <Avatar alt={firstName} src={avatar} />
                </StyledBadge>
              ) : (
                <Avatar alt={firstName} src={avatar} />
              )
            }
            <Stack spacing={0.3}>
              <Typography>{`${firstName} ${lastName}`}</Typography>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton onClick={() => handleSetConversation(_id)}>
                <Chat />
            </IconButton>
          </Stack>
        </Stack>
      </StyledChatBox>
    </>
  )
}

export default FriendComponent