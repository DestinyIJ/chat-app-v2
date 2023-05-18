import { IconButton, Stack } from '@mui/material'
import { GithubLogo, GoogleLogo, TwitterLogo } from 'phosphor-react'
import React from 'react'

const AuthSocial = () => {
  return (
    <>
        <Stack direction={"row"} justifyContent="center" spacing={12} alignItems={"center"}>
            <IconButton>
                <GoogleLogo color='#DF3E30' />
            </IconButton>
            <IconButton color="inherit">
                <GithubLogo />
            </IconButton>
            <IconButton>
                <TwitterLogo color="#1C9CEA" />
            </IconButton>
        </Stack>
    </>
  )
}

export default AuthSocial