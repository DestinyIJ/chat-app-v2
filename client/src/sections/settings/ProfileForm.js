import React, { useState } from 'react'

import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { FormProvider, FormTextField } from '../../components/hook-form'
import { Alert, Button, IconButton, InputAdornment, Link, Stack } from '@mui/material'
import { Eye, EyeSlash } from 'phosphor-react'

import { Link as RouterLink } from 'react-router-dom'
import { useCallback } from 'react'


const ProfileForm = () => {

    const ProfileSchemaSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        about: Yup.string().default("Hey! I am"),
        avatarUrl: Yup.string().default(null)
    })

    const defaultValues = {
        name: "",
        about: ""
    }

    const methods = useForm({
        resolver: yupResolver(ProfileSchemaSchema),
        defaultValues
    })

    const { reset, watch, setValue, control, setError, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = methods
    
    const values = watch()

    const handleDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0]

        const newFile = Object.assign(file, {
            preview: URL.createObjectURL(file)
        })

        if(file) setValue("avatarUrl", file, { shouldValidate: true })

    }, [setValue])
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
                    name="name" label="Name" 
                    helperText={"This name is visible to your contacts"}
                />
                <FormTextField 
                    multiline rows={3} maxRows={6}
                    name="about" label="About"
                />

                <Stack alignItems={"flex-end"}>
                    <Button
                        color="primary"
                        size="medium"
                        type="submit"
                        variant='outlined'
                    >
                        Save
                    </Button>
                </Stack>
            </Stack>
        
            
        </FormProvider>
    )
}

export default ProfileForm