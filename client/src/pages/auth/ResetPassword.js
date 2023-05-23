import { Stack, Typography, Link } from '@mui/material'
import { CaretRight } from 'phosphor-react'
import React from 'react'
import { Link as RouterLink, useSearchParams } from 'react-router-dom'
import ResetPasswordForm from '../../sections/auth/ResetPasswordForm'

const ResetPassword = () => {
  const [queryParams] = useSearchParams()
  const token = queryParams.get("token")

  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant='h4'>Reset your password</Typography>
        <Typography variant='subtitle2' sx={{ color: "text.secondary", mb: 5 }}>
            Please set your new password
        </Typography>

        <ResetPasswordForm resetToken={token} />

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

export default ResetPassword