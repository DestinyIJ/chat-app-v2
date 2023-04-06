import { createPortal } from "react-dom";
import { Box, Stack, IconButton, TextField, InputAdornment, Fab, Tooltip } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles"
import {  Camera, File, Image, LinkSimple, PaperPlaneTilt, Smiley, Sticker, User } from 'phosphor-react';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useState } from "react";

const actions = [
    {
        color: "#4da5fe",
        icon: <Image size={24} />,
        title: "Photo/Video"
    },
    {
        color: "#1b8cfe",
        icon: <Sticker size={24} />,
        title: "Stickers"
    },
    {
        color: "#0172e4",
        icon: <Camera size={24} />,
        title: "Image"
    },
    {
        color: "#0159b2",
        icon: <File size={24} />,
        title: "Document"
    },
    {
        color: "#013f7f",
        icon: <User size={24} />,
        title: "Contact"
    }
]

const StyledInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
        padding: "12px"
    }
}));

const ChatInput = ({ setOpenEmojiPicker }) => {
    const [openActions, setOpenActions] = useState(false)

    return (
        <StyledInput  fullWidth placeholder='Write a message...' variant='filled' InputProps={{
            disableUnderline: true, 
            startAdornment: 
            <Stack sx={{ width: "max-content"}}>
                {
                    openActions && 
                    <Stack position='absolute' bottom={50} gap={1}>
                        {actions.map((action) => (
                            <Tooltip title={action.title} placement="right">
                                <Fab sx={{ backgroundColor: action.color }}>
                                    {action.icon}
                                </Fab>
                            </Tooltip>
                        ))}
                    </Stack>
                }
                <InputAdornment position="end">
                <IconButton onClick={() => setOpenActions(prev => !prev)}>
                    <LinkSimple />
                </IconButton>
                </InputAdornment>
            </Stack>,
            endAdornment: <InputAdornment position='end'>
                <IconButton onClick={() => setOpenEmojiPicker(prev => (!prev))}>
                    <Smiley />
                </IconButton>
            </InputAdornment>
        }} />
    )
}


const Footer = () => {
    const theme = useTheme()
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false)

    return (
        <Box  p={2.5} sx={{  
            width: '100%', 
            backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.paper,
            boxShadow: "2px 0px 2px rgba(0, 0, 0, 0.25)"
            }}
        >
            <Stack direction="row" alignItems="center" spacing={3} id="chatbox">
                {/* Chat Input*/}
                <Stack sx={{ width: "100%"}}>
                    { openEmojiPicker && 
                        <Stack position={'relative'} zIndex={10}>
                            <Box position={'absolute'} bottom={10} right={10} >
                                <Picker data={data} onEmojiSelect={console.log} theme={theme.palette.mode} />
                            </Box>
                        </Stack>
                    }
                    
                    <ChatInput setOpenEmojiPicker={setOpenEmojiPicker} />
                </Stack>
                

                <Box sx={{
                    display: "flex", 
                    alignItems: "center", justifyContent: "center",
                    height: 48, width: 48, 
                    backgroundColor: theme.palette.primary.main, 
                    borderRadius: 1.5}}
                >
                    <IconButton>
                        <PaperPlaneTilt color='#fff' />
                    </IconButton>
                </Box>
            </Stack>
        </Box>
    )
}

export default Footer