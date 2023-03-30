import React, {useState} from 'react'
import { Box, Stack } from "@mui/material";

import Header from './Header';
import Footer from './Footer';

import Messages from './Messages';



const ChatBox = () => {
    const [isOnline, setIsOnline] = useState(true)

    return (
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
    )
}

export default ChatBox