import { Box, Stack, Typography, IconButton, Avatar, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles"
import { faker } from '@faker-js/faker';
import { CaretDown, MagnifyingGlass, Phone, VideoCamera } from 'phosphor-react';
import StyledBadge from "../StyledBadge";

import { toggleSidebar } from "../../redux/app/app.action";
import { useDispatch } from "react-redux";

const Header = ({ isOnline }) => {
    const theme = useTheme()
    const dispatch = useDispatch()

    return (
        <Box p={2.5} sx={{ 
            width: '100%', 
            backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.paper,
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)"
            }}
        >
            <Stack 
                alignItems="center" direction="row" 
                justifyContent="space-between"
                sx={{  height: "100%" }}
            >
                <Stack onClick={() => {
                    dispatch(toggleSidebar())
                }} direction="row" spacing={2}>
                    <Box>
                        { isOnline ? 
                            <StyledBadge overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "right" }} variant="dot">
                                <Avatar sx={{ cursor: "pointer" }} alt={faker.name.fullName()} src={faker.image.avatar()} />
                            </StyledBadge>
                            : <Avatar sx={{ cursor: "pointer" }} alt={faker.name.fullName()} src={faker.image.avatar()} />
                        }
                    </Box>
                    <Stack spacing={0.2}>
                        <Typography variant="subtitle2">
                            {faker.name.fullName()}
                        </Typography>
                        {isOnline && <Typography>Online</Typography>}
                    </Stack>  
                </Stack>

                <Stack direction="row" alignItems={"center"} spacing={3}>
                    <IconButton>
                        <VideoCamera />
                    </IconButton>
                    <IconButton>
                        <Phone />
                    </IconButton>
                    <IconButton>
                        <MagnifyingGlass />
                    </IconButton>
                    <Divider orientation='vertical' flexItem />
                    <IconButton>
                        <CaretDown />
                    </IconButton>
                </Stack>
            </Stack>
        </Box>
    )
}

export default Header