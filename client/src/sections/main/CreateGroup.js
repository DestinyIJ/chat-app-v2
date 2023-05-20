import React from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide, Stack, Alert, Divider, IconButton, Typography } from '@mui/material'

import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormAutoComplete, FormProvider, FormTextField } from '../../components/hook-form'
import { X } from 'phosphor-react'

const MEMBERS = ["Name 1", "Name 2"]

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />
})

const CreateGroupForm = ({ toggleDialog }) => {
    const CreateGroupSchema = Yup.object().shape({
        name: Yup.string().required("Group name is required"),
        members: Yup.array().min(2, "Must have at least 2 members")
    })

    const defaultValues = {
        name: "",
        members: []
    }

    const methods = useForm({
        resolver: yupResolver(CreateGroupSchema),
        defaultValues
    })

    const { reset,
        watch, 
        setError, 
        handleSubmit, 
        formState: { errors, isSubmitting, isSubmitSuccessful, isValid } } = methods

    const onSubmit = async (submitData) => {
        try {
            // 
        } catch (error) {
            reset()
            setError("afterSubmit", {
                ...error,
                message: error?.message
            })
        }
    }

    return (
        <>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3}>
                {
                    !!errors.afterSubmit &&
                    <Alert severity='error'>{errors.afterSubmit.message}</Alert>
                }
                <FormTextField name="name" label="Group Name"  />
                <FormAutoComplete 
                    name="members" label="Members" 
                    multiple freeSolo 
                    ChipProps={{ size: "medium"}}
                    options={MEMBERS.map((member) => member)} 
                />
                <Stack spacing={2} direction="row" justifyContent={"flex-end"} alignItems="center">
                    <Button onClick={() => toggleDialog()}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained">
                        Create Group
                    </Button>
                </Stack>
                </Stack>
            </FormProvider>
        </>
    )
}

const CreateGroup = ({ open, toggleDialog }) => (
    <>
        <Dialog
            fullWidth
            maxWidth="xs"
            open={open}
            TransitionComponent={Transition}
            keepMounted
            sx={{ p: 4 }}
            onClose={() => toggleDialog()}
        >
            <DialogTitle
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2.5
                }}
            >
                <Typography variant="h6">Create New Group</Typography>

                <IconButton onClick={() => toggleDialog()}>
                    <X />
                </IconButton>
            </DialogTitle>
           
            <DialogContent>
                <CreateGroupForm toggleDialog={toggleDialog} />
            </DialogContent>
        </Dialog>
    </>
)

export default CreateGroup