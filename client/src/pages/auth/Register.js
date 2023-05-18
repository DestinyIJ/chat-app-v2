import { Stack, Typography, Link, Divider } from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import AuthSocial from '../../sections/auth/AuthSocial'
import RegisterForm from '../../sections/auth/RegisterForm'

const Register = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant='h4'>Get Started with Cohoot</Typography>

        <Stack direction={"row"} justifyContent="flex-end" spacing={0.5}>
          <Typography variant="body2">Already have an account?</Typography>
          <Link to="/auth/login" component={RouterLink} variant="subtitle2">
            Sign In
          </Link>
        </Stack>

        <RegisterForm />

        <Divider sx={{
          my: 2.5,
          typography: "overline",
          color: "text.disabled",
          "&::before, &::after": {
            borderTopStyle: "dashed"
          }
        }}>OR, SIGN UP WITH</Divider>

        <AuthSocial />

        <Typography 
            component={"div"} 
            sx={{
                color: "text.secondary",
                mt: 3,
                typography: "caption",
                textAlign: "center"
            }}
        >   {"By Signing up, I agree to "}
            <Link 
                underline='always' to="/terms-of-service" 
                component={RouterLink} variant="subtitle2"
                color={"text.primary"}
            >
                Terms of Service
            </Link>
            {" and "}
            <Link 
                underline='always' to="/privacy-policy" 
                component={RouterLink} variant="subtitle2"
                color={"text.primary"}
            >
                Privacy Policy
            </Link>
        </Typography>


      </Stack>
    </>
  )
}

export default Register