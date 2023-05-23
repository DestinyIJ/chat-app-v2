import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useLocation, NavLink, useNavigate } from "react-router-dom";

// faker
import { faker } from "@faker-js/faker";

// Material-UI
import { Box, Stack, IconButton, Divider, Avatar, MenuItem, Menu } from "@mui/material";
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

// data
import { Profile_Menu } from "../../data";
import { LOGIN_PATH } from "../../config";

import { logoutSuccess } from '../../redux/auth/auth.action';



const ProfileMenu = ({ incoming }) => {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate()

  const handleClick = (e) => {
      setMenuOpen(prev => !prev)
      setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
      setAnchorEl(null)
      setMenuOpen(false)
  }

  const onClickOption = (option) => {
      switch (option) {
        case "logout":
          dispatch(logoutSuccess());
          navigate(LOGIN_PATH)
          break;
      
        default:
          navigate(`/${option}`)
          break;
      }
  } 

  return (
     <>
      <Avatar src={faker.image.avatar()} id='togggleMenuOpts' size={20} onClick={handleClick} />
      
      <Menu
          id='messageOptions'
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleClose}
          MenuListProps={{
              'aria-labelledby': 'togggleMenuOpts'
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: "right"
          }}
      >
          {
            Profile_Menu.map((option, index) => {
                  if(option.action === "report" && !incoming) return null
                  return (
                    <MenuItem key={index} onClick={() => onClickOption(option.action)}>
                      <Stack width={100} direction="row" alignItems={"center"} justifyContent="space-between">
                        <span>{option.title}</span>
                        {option.icon}
                      </Stack>
                    </MenuItem>)
              })
          }
      </Menu>
     </>
  )
}

const SideBar = () => {
  const theme = useTheme()
  const { onToggleMode } = useSettings()

  const { pathname } = useLocation()

  return (
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
                    to={button.url}
                    component={NavLink}
                    sx={{
                      backgroundColor: `${pathname.startsWith(button.url) ? theme.palette.primary.main : "transaprent"}`,
                      borderRadius: 1.5
                    }}
                  >
                    <IconButton
                      sx={{ 
                        width: "max-content", 
                        color: `${(pathname.startsWith(button.url) && theme.palette.mode === "light") ? "#000" : theme.palette.text.primary}`}}
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
                to={"/settings"}
                component={NavLink}
                sx={{
                  backgroundColor: `${pathname.startsWith("/settings") ? theme.palette.primary.main : "transaprent"}`,
                  borderRadius: 1.5
                }}
              >
                <IconButton 
                  sx={{ width: "max-content", color: `${(pathname.startsWith("/settings") && theme.palette.mode === "light") ? "#000" : theme.palette.text.primary}`}}
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
            <ProfileMenu />
          </Stack>
        </Stack>
      </Box>
  );
};

export default SideBar;
