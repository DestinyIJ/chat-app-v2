import React from 'react'
import { Link as RouterLink} from 'react-router-dom'

import { Stack, Typography, Link } from '@mui/material'
import { CaretRight } from 'phosphor-react'

import VerifyRegisterForm from '../../sections/auth/VerifyRegisterForm'

const VerifyRegister = () => {
  return (
    <>
        <Stack spacing={2} sx={{ mb: 5, position: "relative"}}>
            <Typography>Please Verify OTP</Typography>

            <Stack direction={"row"} spacing={0.5}>
                <Typography>OTP has been sent to ighedodestiny@gmail.com</Typography>
            </Stack>

            <VerifyRegisterForm />

            <Stack direction={"row"} justifyContent="flex-end" spacing={0.5}>
              <Link to="/auth/login" component={RouterLink} variant="subtitle2"
                sx={{ mx: "auto", mt: 3, display: "inline-flex", alignItems: "center"}}
              >
                Sign In here
                <CaretRight />
              </Link>
            </Stack>
        </Stack>
    </>
  )
}

export default VerifyRegister
