import React, { useState } from 'react'

import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux';

import { FormProvider, FormTextField } from '../../components/hook-form'
import { forgotPasswordRequest } from '../../redux/auth/auth.action';

import { Alert, Button, Stack } from '@mui/material'



const ForgotPasswordForm = () => {
    const dispatch = useDispatch();

    const ForgotPasswordSchema = Yup.object().shape({
        email: Yup.string().required("Email is required").email("This field requires valid Email address"),
    })

    const defaultValues = {
        email: ""
    }

    const methods = useForm({
        resolver: yupResolver(ForgotPasswordSchema),
        defaultValues
    })

    const { reset, setError, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = methods
    
    const onSubmit = async ({ email }) => {
        
        try {
            dispatch(forgotPasswordRequest({email}));
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
                <FormTextField name="email" label="Email Address"/>
               
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
                    Submit
                </Button>
            </Stack>

           
            
        </FormProvider>
    )
}

export default ForgotPasswordForm