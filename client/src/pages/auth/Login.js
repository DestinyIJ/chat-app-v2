import { Stack, Typography, Link, Divider } from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import AuthSocial from '../../sections/auth/AuthSocial'
import LoginForm from '../../sections/auth/LoginForm'

const Login = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant='h4'>Login to Circle</Typography>

        <LoginForm />

        <Stack direction={"row"} justifyContent="flex-end" spacing={0.5}>
          <Typography variant="body2">New User?</Typography>
          <Link to="/auth/register" component={RouterLink} variant="subtitle2">
            Create an account
          </Link>
        </Stack>

        <Divider sx={{
          my: 2.5,
          typography: "overline",
          color: "text.disabled",
          "&::before, &::after": {
            borderTopStyle: "dashed"
          }
        }}>OR</Divider>
        <AuthSocial />
      </Stack>
    </>
  )
}

export default Login