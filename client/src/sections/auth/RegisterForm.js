import React, { useState, useEffect } from 'react'

import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {  useSelector, useDispatch } from 'react-redux';

import { FormProvider, FormTextField } from '../../components/hook-form'
import { registerRequest, resetSuccess } from '../../redux/auth/auth.action';
import { selectAuth } from '../../redux/auth/auth.selector';

import { Alert, Button, IconButton, InputAdornment, Stack } from '@mui/material'
import { Eye, EyeSlash } from 'phosphor-react'



const RegisterForm = () => {
    const dispatch = useDispatch();
    const { 
        loading:registerLoading, 
        error:registerError, 
        success:registerSuccess } = useSelector(selectAuth)
    const [showPassword, setShowPassword] = useState(false)

    const RegisterSchema = Yup.object().shape({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        email: Yup.string().required("Email is required").email("This field requires valid Email address"),
        password: Yup.string().min(6, "Password must be at least 6 characters long").required("Password is required")
    })

    const defaultValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    }

    const methods = useForm({
        resolver: yupResolver(RegisterSchema),
        defaultValues
    })

    const { reset, setError, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = methods
    
    const onSubmit = async (userData) => {
        try {
            dispatch(registerRequest(userData)); 
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
                <Stack direction={{ xs: "column", sm:"row"}} spacing={3}>
                    <FormTextField name="firstName" label="First Name" />
                    <FormTextField name="lastName" label="Last Name" />
                </Stack>
                
                <FormTextField name="email" label="Email Address" />
                <FormTextField 
                    name="password" label="Password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Enter Password" 
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
            </Stack>
            
            <Button
                fullWidth
                color="inherit"
                size="large"
                type="submit"
                variant='contained'
                sx={{
                    my: 2,
                    bgColor: "text.primary",
                    color: (theme) => theme.palette.mode === "light" ? "common.white" : "grey.800",
                    "&:hover":  {
                        bgColor: "text.primary",
                        color: (theme) => theme.palette.mode === "light" ? "common.white" : "grey.800",
                    }
                }}
            >
                SIGN UP 
            </Button>
            
        </FormProvider>
    )
}

export default RegisterForm