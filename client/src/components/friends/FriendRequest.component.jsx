import { Avatar, Button, Stack, styled, Typography, useTheme, Box } from '@mui/material'
import React from 'react'
import { socket } from '../../utils/socket'
import StyledBadge from '../StyledBadge'

const StyledChatBox = styled(Box)(({ theme }) => ({
  "&:hover" : {
    cursor: "pointer"
  }
}))

const FriendRequestComponent = ({ firstName, lastName, _id, online, avatar }) => {
  const theme = useTheme()

  const acceptRequest = (id) => {
    socket.emit("accept_friend_request", id)
  }

  const declineRequest = (id) => {
    socket.emit("decline_friend_request", id)
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
            <Button
                color='success'
                variant='outlined'
              onClick={() => acceptRequest(_id)}
            >
              Accept Request
            </Button>

            <Button
                color='error'
                variant='outlined'
              onClick={() => declineRequest(_id)}
            >
              Decline Request
            </Button>
          </Stack>
        </Stack>
      </StyledChatBox>
    </>
  )
}

export default FriendRequestComponent