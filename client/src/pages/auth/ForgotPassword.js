import { Stack, Typography, Link } from '@mui/material'
import { CaretLeft } from 'phosphor-react'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import ForgotPasswordForm from '../../sections/auth/ForgotPasswordForm'

const ForgotPassword = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant='h3'>Forgot your password?</Typography>
        <Typography variant='subtitle2' sx={{ color: "text.secondary", mb: 5 }}>
            Please enter the email address associated with your account
            and we will email you a link to reset your password
        </Typography>

        <Link to="/auth/login" component={RouterLink} color="inherit" variant="subtitle2"
            sx={{ mx: "auto", mt: 3, display: "inline-flex", alignItems: "center"}}
        >
            <CaretLeft />
            Return to Sign In
          </Link>

        <ForgotPasswordForm />

        <Stack direction={"row"} justifyContent="flex-end" spacing={0.5}>
          <Typography variant="body2">New User?</Typography>
          <Link to="/auth/register" component={RouterLink} variant="subtitle2">
            Create an account
          </Link>
        </Stack>
      </Stack>
    </>
  )
}

export default ForgotPassword