import React from 'react'
import { Box, Stack, Typography, IconButton, Avatar, Divider, Button } from '@mui/material'
import { useTheme } from "@mui/material/styles"

import { Bell, CaretRight, Phone, Prohibit, Star, Trash, VideoCamera, X } from 'phosphor-react'

import { useDispatch } from "react-redux";
import { toggleSidebar } from '../../redux/app/app.action';
import { faker } from '@faker-js/faker';
import AntSwitch from '../AntSwitch';

const Contact = () => {
    const theme = useTheme()
    const dispatch = useDispatch()

    return (
        <Box sx={{
            width: 320,
            height: "100vh",
            backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background,
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
                    <Button endIcon={<CaretRight />}>
                        25
                    </Button>
                </Stack>

                <Stack direction="row" spacing={2} alignItems={"center"}>
                    {
                        [1,2,4].map((i) => {
                            <Box key={i}>
                                <img src={faker.image.fashion()} alt={faker.name.fullName()} />
                            </Box>
                        })
                    }
                </Stack>
                <Divider />

                <Stack direction={"row"} alignItems="center" justifyContent={"space-between"}>
                    <Stack direction="row" spacing={2} alignItems={"center"}>
                        <Star size={21} />
                        <Typography variant={"subtitle2"}>Starred Messages</Typography>
                    </Stack>

                    <IconButton>
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
                    <Button startIcon={<Prohibit />} fullWidth variant="outlined">
                        Block
                    </Button>
                    <Button startIcon={<Trash />} fullWidth variant="outlined">
                        Delete
                    </Button>
                </Stack>
            </Stack>
        </Stack>
        </Box>
    )
}

export default Contact
