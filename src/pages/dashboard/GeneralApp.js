import React from "react";
import Chats from "./Chats";
import { Stack, Box } from '@mui/material'
import { useTheme } from "@mui/material/styles"
import { ChatBox } from "../../components";

const GeneralApp = () => {
  const theme = useTheme()

  return (
    <>
      <Stack direction={'row'} sx={{ width: "100%"}}>
        {/* chat list */}
        <Chats />
        {/* chat box */}
        <Box 
          sx={{
            height: "100%",
            width: "100%",
            backgroundColor: theme.palette.mode === "light" ? "#FFF" : theme.palette.background.default,
          }}
        >
          <ChatBox />
        </Box>
      </Stack>
    </>
  );
};

export default GeneralApp;
