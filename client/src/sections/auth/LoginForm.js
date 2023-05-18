import React, { useState } from 'react'

import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { FormProvider, FormTextField } from '../../components/hook-form'
import { Alert, Button, IconButton, InputAdornment, Link, Stack } from '@mui/material'
import { Eye, EyeSlash } from 'phosphor-react'

import { Link as RouterLink } from 'react-router-dom'


const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false)

    const LoginSchema = Yup.object().shape({
        email: Yup.string().required("Email is required").email("This field requires valid Email address"),
        password: Yup.string().required("Password is required")
    })

    const defaultValues = {
        email: "",
        password: ""
    }

    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues
    })

    const { reset, setError, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = methods
    
    const onSubmit = async (submitData) => {
        try {
            // 
        } catch(error) {
            reset()
            setError("afterSubmit", {
                ...error,
                message: error?.message
            })
        }
    }

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                {
                    !!errors.afterSubmit &&
                    <Alert severity='error'>{errors.afterSubmit.message}</Alert>
                }
                <FormTextField 
                    name="email" label="Email Address" 
                    placeholder="Enter Email Address" 
                />
                <FormTextField 
                    name="password" label="Password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Enter Password" 
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton onClick={() => setShowPassword(prev => !prev)}>
                                    { showPassword ? <EyeSlash /> : <Eye />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </Stack>
            <Stack alignItems="flex-end" sx={{ my: 2 }}>
                <Link to="/auth/forgot-password" component={RouterLink} variant="body2" color="inherit" underline="always">
                    Forgot Password?
                </Link>
            </Stack>
            <Button
                fullWidth
                color="inherit"
                size="large"
                type="submit"
                variant='contained'
                sx={{
                    bgColor: "text.primary",
                    color: (theme) => theme.palette.mode === "light" ? "common.white" : "grey.800",
                    "&:hover":  {
                        bgColor: "text.primary",
                        color: (theme) => theme.palette.mode === "light" ? "common.white" : "grey.800",
                    }
                }}
            >
                Login
            </Button>
            
        </FormProvider>
    )
}

export default LoginForm