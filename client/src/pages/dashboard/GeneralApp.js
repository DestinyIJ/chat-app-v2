import React from "react";
import Chats from "./Chats";
import { Stack } from '@mui/material'
import { ChatBox } from "../../components";


const GeneralApp = () => {


  return (
    <>
      <Stack direction={'row'} sx={{ width: "100%"}}>
        {/* chat list */}
        <Chats />
        {/* chat box */}
        <ChatBox />
        
      </Stack>
    </>
  );
};

export default GeneralApp;
