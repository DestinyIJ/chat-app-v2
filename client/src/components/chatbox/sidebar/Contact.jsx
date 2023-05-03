import React from 'react'
import { Box, Stack, Typography, IconButton, Avatar, Divider, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide } from '@mui/material'

import { Bell, CaretRight, Phone, Prohibit, Star, Trash, VideoCamera, X } from 'phosphor-react'

import { useDispatch } from "react-redux";
import { toggleSidebar, updateSidebarType } from '../../../redux/app/app.action';
import appActionTypes from '../../../redux/app/app.types';
import { faker } from '@faker-js/faker';
import AntSwitch from '../../AntSwitch';
import { useReducer } from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />
})
const BlockDialog = ({ open, toggleDialog }) => {

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => toggleDialog("BLOCK")}
        >
            <DialogTitle>Block this contact</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Jeremiah will be blocked from your contact, are you sure?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => toggleDialog("BLOCK")}>Cancel</Button>
                <Button>Block</Button>
            </DialogActions>

        </Dialog>
    )
}

const DeleteDialog = ({ open, toggleDialog }) => {

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => toggleDialog("DELETE")}
        >
            <DialogTitle>Delete this contact</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Jeremiah will be deleted from your Contact, are you sure?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => toggleDialog("DELETE")}>Cancel</Button>
                <Button>Block</Button>
            </DialogActions>

        </Dialog>
    )
}


const INITIAL_DIALOG = {
    block: false,
    delete: false
}

const dialogreducer = (state, action) => {
    switch (action.type) {
      case "BLOCK":
        return {
            ...state,
            block: !state.block,
            delete: false
        }
    case "DELETE":
        return {
            ...state,
            block: false,
            delete: !state.delete
        }
      default:
        return state;
    }
  };

const Contact = () => {
    const dispatch = useDispatch()
    const [dialog, dispatchDialog] = useReducer(dialogreducer, INITIAL_DIALOG)
    
    const toggleDialog = (action) => {
        dispatchDialog({ type: action })
    }

    return (
        <Box sx={{
            width: 320,
            height: "100vh",
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.45)",
        }}>
        <Stack sx={{ height: "100%"}}>
            {/* Header */}
            <Box sx={{
                boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.45)",
                width: "100%",
            }}>
                <Stack
                    direction="row"
                    sx={{ height: "100%", p: 2 }}
                    alignItems="center" justifyContent="space-between"
                    spacing={3}
                > 
                    <Typography variant='subtitle2'>Contact Info</Typography>
                    <IconButton onClick={() => { dispatch(toggleSidebar())} }>
                        <X />
                    </IconButton>
                </Stack>
            </Box>

            {/* Body */}
            <Stack sx={{ 
                height: "100%", 
                position: "relative", 
                flexGrow: 1, 
                overflowY: "scroll",
                '::-webkit-scrollbar' : { display: 'none'}
                }} 
                p={3} spacing={3}
            >
                <Stack alignItems={"center"} direction="row" spacing={2}>
                    <Avatar src={faker.image.avatar()} alt={faker.name.firstName()} sx={{ height: 64, width:64 }} />
                    <Stack spacing={0.5}>
                        <Typography variant={"article"} fontWeight={600}>
                            {faker.name.fullName()}
                        </Typography>
                        <Typography variant={"body2"} fontWeight={500}>
                            {"+234 814 447 8958"}
                        </Typography>
                    </Stack>
                </Stack>

                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-evenly"}>
                    <Stack spacing={1} alignItems="center">
                        <IconButton><Phone /></IconButton>
                        <Typography variant="overline">Voice</Typography>
                    </Stack>
                    <Stack spacing={1} alignItems="center">
                        <IconButton><VideoCamera /></IconButton>
                        <Typography variant="overline">Video</Typography>
                    </Stack>
                </Stack>
                <Divider />

                <Stack spacing={0.5}>
                    <Typography variant="article">About</Typography>
                    <Typography variant="body2">Dare to dream</Typography>
                </Stack>
                <Divider />

                <Stack direction="row" alignItems={"center"} justifyContent={"space-between"}>
                    <Typography variant="subtitle2">Media, Links &amp; Docs</Typography>
                    <Button endIcon={<CaretRight />} 
                        onClick={
                            () => {dispatch(
                                    updateSidebarType(appActionTypes.SIDEBAR_TYPES.SHARED_MESSAGES)
                                    )} 
                        }
                    >
                        25
                    </Button>
                </Stack>

                <Stack direction="row" spacing={2} alignItems={"center"}>
                    {
                        [1,2,4].map((i) => (
                            <Box key={i}>
                                <img src={faker.image.fashion()} alt={faker.name.fullName()} />
                            </Box>
                        ))
                    }
                </Stack>
                <Divider />

                <Stack direction={"row"} alignItems="center" justifyContent={"space-between"}>
                    <Stack direction="row" spacing={2} alignItems={"center"}>
                        <Star size={21} />
                        <Typography variant={"subtitle2"}>Starred Messages</Typography>
                    </Stack>

                    <IconButton
                        onClick={
                            () => {dispatch(
                                    updateSidebarType(appActionTypes.SIDEBAR_TYPES.STARRED_MESSAGES)
                                    )} 
                        }
                    >
                        <CaretRight />
                    </IconButton>
                </Stack>
                <Divider />

                <Stack direction={"row"} alignItems="center" justifyContent={"space-between"}>
                    <Stack direction="row" spacing={2} alignItems={"center"}>
                        <Bell size={21} />
                        <Typography variant={"subtitle2"}>Mute Notifications</Typography>
                    </Stack>

                    <AntSwitch />
                </Stack>
                <Divider />

                <Typography>1 group in common</Typography>
                <Stack direction="row" spacing={2} alignItems={"center"}>
                    <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} />
                    <Stack spacing={0.5}>
                        <Typography variant="subtitle2">Destiny Ighedo</Typography>
                        <Typography variant="caption">Lion, Lone Wolf, You</Typography>
                    </Stack>
                </Stack>

                <Stack direction="row" spacing={2} alignItems={"center"}>
                    <Button onClick={() => toggleDialog("BLOCK")} startIcon={<Prohibit />} fullWidth variant="outlined">
                        Block
                    </Button>
                    <Button onClick={() => toggleDialog("DELETE")} startIcon={<Trash />} fullWidth variant="outlined">
                        Delete
                    </Button>
                </Stack>
            </Stack>
        </Stack>
        { dialog.block && <BlockDialog open={dialog.block} toggleDialog={toggleDialog} />}
        { dialog.delete && <DeleteDialog open={dialog.delete} toggleDialog={toggleDialog} />}
        </Box>
    )
}

export default Contact
