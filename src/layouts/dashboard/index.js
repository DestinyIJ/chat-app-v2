import React, { useState } from "react";
import { Outlet } from "react-router-dom";

// faker
import { faker } from "@faker-js/faker";

// Material-UI
import { Box, Stack, IconButton, Divider, Avatar } from "@mui/material";
import { useTheme } from "@mui/material/styles"

// Icons
import { Gear } from "phosphor-react";

// Assets
import Logo from '../../assets/Images/logo.ico'

// static data
import { Nav_Buttons } from "../../data";

// components
import { AntSwitch } from "../../components";

// utils 
import { useSettings } from "../../hooks";


const DashboardLayout = () => {
  const theme = useTheme()
  const { onToggleMode } = useSettings()
  const [selectedBtn, setSelectedBtn] = useState(0)

  const onClickedIcon = (index) => {
    setSelectedBtn(index)
  }


  return (
    <Stack direction="row" sx={{ width: "100%", height: "100%"}}>
      {/* siderbar*/}
      <Box
        p={2}
        sx={{
          backgroundColor: theme.palette.background.paper,
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          height: "100vh",
          width: 100,
        }}
      >
        {/* navigation icons */}
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="space-between"
          spacing={3}
          sx={{
            width: "100%",
            height: "100%"
          }}
        >
          {/* logo and Nav buttons */}
          <Stack
            alignItems="center"
            justifyContent="space-between"
            spacing={3}
          >
            {/* Logo*/}
            <Box
              sx={{
                backgroundColor: theme.palette.primary.main,
                height: 64,
                width: 64,
                borderRadius: 1.5
              }}
            >
              <img src={Logo} alt="Logo" />
            </Box>

            {/* users, phone, chat, settings buttons */}
            <Stack 
              direction="column" alignItems="center" spacing={3}
              sx={{
                width: "max-content"
              }}
            >
              {
                Nav_Buttons.map((button) => (
                  <Box
                    key={button.index} 
                    p={1}
                    sx={{
                      backgroundColor: `${selectedBtn === button.index ? theme.palette.primary.main : "transaprent"}`,
                      borderRadius: 1.5
                    }}
                  >
                    <IconButton
                      sx={{ 
                        width: "max-content", 
                        color: `${(selectedBtn === button.index && theme.palette.mode === "light") ? "#000" : theme.palette.text.primary}`}}
                      onClick={() => onClickedIcon(button.index)}
                    >
                      {button.icon}
                    </IconButton>
                  </Box>
                ))
              }
              <Divider sx={{ width: "48px", height: "2px"}} />
              {/* settings */}
              <Box
                p={1}
                sx={{
                  backgroundColor: `${selectedBtn === Nav_Buttons.length ? theme.palette.primary.main : "transaprent"}`,
                  borderRadius: 1.5
                }}
              >
                <IconButton 
                  sx={{ width: "max-content", color: `${(selectedBtn === Nav_Buttons.length && theme.palette.mode === "light") ? "#000" : theme.palette.text.primary}`}}
                  onClick={() => onClickedIcon(Nav_Buttons.length)}
                >
                  <Gear />
                </IconButton>
              </Box>
            </Stack>
          </Stack>

          {/* Avatar, Theme-Switch */}
          <Stack
            alignItems="end"
            spacing={4}
          >
            {/* Switch */}
            <Stack direction="row" spacing={1} alignItems="center">
              <AntSwitch onChange={onToggleMode} defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
            </Stack>
            {/* Avatar */}
            <Avatar src={faker.image.avatar()} />
          </Stack>
        </Stack>
      </Box>
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
