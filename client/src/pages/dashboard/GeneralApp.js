import React from "react";
import Chats from "./Chats";
import { Stack, Box } from '@mui/material'
import { useTheme } from "@mui/material/styles"
import { ChatBox, Contact } from "../../components";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { selectSidebarOpen } from "../../redux/app/app.selector";

const GeneralApp = () => {
  const theme = useTheme()
  const isSidebarOpen = useSelector(selectSidebarOpen)


  return (
    <>
      <Stack direction={'row'} sx={{ width: "100%"}}>
        {/* chat list */}
        <Chats />
        {/* chat box */}
        <Box 
          sx={{
            height: "100%",
            width: isSidebarOpen ? "calc(100vw - 740px)" : "calc(100vw - 420px)",
            backgroundColor: theme.palette.mode === "light" ? "#FFF" : theme.palette.background.default,
          }}
        >
          <ChatBox />
        </Box>
        {/* Contact */}
        {isSidebarOpen && <Contact />}
      </Stack>
    </>
  );
};

export default GeneralApp;
