import React, {useState} from 'react'
import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles"

import Header from './Header';
import Footer from './Footer';


import Messages from './Messages';
import Sidebar from './sidebar/Sidebar';

import { useSelector } from "react-redux";
import { selectSidebarOpen } from '../../redux/app/app.selector';
import { selectChat } from '../../redux/chat/chat.selector';

import NoChatSvg from '../../assets/Illustration/NoChat';


const ChatBox = () => {
    const theme = useTheme()
    const isSidebarOpen = useSelector(selectSidebarOpen)
    const { id, type } = useSelector(selectChat)
    const [isOnline, setIsOnline] = useState(true)

    return (
        <>
            {
                id !== null && type === "private" ? (
                    <Box 
                        sx={{
                            height: "100%",
                            width: isSidebarOpen ? "calc(100vw - 740px)" : "calc(100vw - 420px)",
                            backgroundColor: theme.palette.mode === "light" ? "#FFF" : theme.palette.background.default,
                        }}
                    >
                        <Stack height="100%" maxHeight="100vh" width="auto">
                            {/* chat header */}
                            <Header isOnline={isOnline} />

                            {/* msg box */}
                            <Box
                                width="100%"
                                sx={{
                                    flexGrow: 1,
                                    height: '100%',
                                    overflow: 'scroll',
                                    '::-webkit-scrollbar' : { display: 'none'}
                                }}
                            >
                                <Messages />
                            </Box>


                            {/* chat footer */}
                            <Footer />
                        </Stack>
                    </Box>) : (
                    <Stack spacing={2} sx={{
                            height: "100%",
                            width: "100%"
                            }}
                            alignItems="center"
                            justifyContent="center"
                        >
                        <NoChatSvg />
                        <Typography variant="subtitle2">
                            Select a conversation or start a new one
                        </Typography>
                    </Stack>
                    )
            }
            {isSidebarOpen && <Sidebar />}  
        </>
    )
}

export default ChatBox