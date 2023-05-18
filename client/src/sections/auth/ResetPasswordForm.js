import React, { useState } from 'react'

import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { FormProvider, FormTextField } from '../../components/hook-form'
import { Alert, Button, IconButton, InputAdornment, Link, Stack } from '@mui/material'
import { Eye, EyeSlash } from 'phosphor-react'

import { Link as RouterLink } from 'react-router-dom'


const ResetPasswordForm = () => {
    const [showPassword, setShowPassword] = useState(false)

    const ResetPasswordSchema = Yup.object().shape({
        newpassword: Yup.string().min("Password must be at least 6 characters long").required("Password is required"),
        confirmPassword: Yup.string().required("Password is required").oneOf([Yup.ref("password"), null], "Password must match")
    })

    const defaultValues = {
        newPassword: "",
        confirmPassword: ""
    }

    const methods = useForm({
        resolver: yupResolver(ResetPasswordSchema),
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
                    name="newPassword" label="New Password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Enter New Password" 
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton onClick={() => setShowPassword(prev => !prev)}>
                                    { showPassword ? <EyeSlash /> : <Eye />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <FormTextField 
                    name="confirmPassword" label="Confirm Password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Enter Password again" 
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton onClick={() => setShowPassword(prev => !prev)}>
                                    { showPassword ? <EyeSlash /> : <Eye />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />

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
                    Reset
                </Button>
            </Stack>
            
            
            
        </FormProvider>
    )
}

export default ResetPasswordForm