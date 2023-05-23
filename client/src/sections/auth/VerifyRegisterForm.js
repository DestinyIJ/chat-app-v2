import React, { useEffect} from 'react'

import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link as RouterLink, useNavigate} from 'react-router-dom'
import {  useSelector, useDispatch } from 'react-redux';

import { FormProvider, FormTextField, FormCodes } from '../../components/hook-form'
import { verifyRegisterRequest } from '../../redux/auth/auth.action';
import { selectAuth } from '../../redux/auth/auth.selector';

import { Alert, Button,  Stack } from '@mui/material'
import { Eye, EyeSlash } from 'phosphor-react'
import { LOGIN_PATH } from '../../config'




const VerifyRegisterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { 
        loading:verifyLoading, 
        error:verifyError, 
        success:verifySuccess,
        registerUser } = useSelector(selectAuth)
    
    const VerifyOTPSchema = Yup.object().shape({
        code1: Yup.string().required("Code is required"),
        code2: Yup.string().required("Code is required"),
        code3: Yup.string().required("Code is required"),
        code4: Yup.string().required("Code is required"),
        code5: Yup.string().required("Code is required"),
        code6: Yup.string().required("Code is required")
    })

    const defaultValues = {
        code1: "",
        code2: "",
        code3: "",
        code4: "",
        code5: "",
        code6: ""
    }

    const methods = useForm({
        resolver: yupResolver(VerifyOTPSchema),
        defaultValues
    })

    const { reset, setError, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = methods
    
    const onSubmit = async (data) => {
        const otp = `${data.code1}${data.code2}${data.code3}${data.code4}${data.code5}${data.code6}`
        console.log(registerUser)
        const email = registerUser?.email
        try {
            dispatch(verifyRegisterRequest({ otp, email })); 
        } catch(error) {
            reset()
            setError("afterSubmit", {
                ...error,
                message: error?.message
            })
        }
    }

    // useEffect(() => {
    //     if (verifySuccess) {
    //       navigate(LOGIN_PATH);
    //     }
    // }, [verifySuccess]);

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                {
                    !!errors.afterSubmit &&
                    <Alert severity='error'>{errors.afterSubmit.message}</Alert>
                }
                
                <FormCodes 
                    keyName="code" 
                    inputs={["code1", "code2", "code3", "code4", "code5", "code6"]} />
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
                    Verify
                </Button>
            </Stack>
        </FormProvider>
    )
}

export default VerifyRegisterForm