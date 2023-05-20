import { Box, Stack, Typography, Avatar, Badge, IconButton } from "@mui/material";
import { Phone, VideoCamera } from "phosphor-react";
import StyledBadge from "./StyledBadge";


const CallElement = ({id, img, name, number, online }) => {

    return (
        <Box key={id} sx={{ 
            width: "100%", borderRadius: 1, 
            backgroundColor: (theme) => theme.palette.mode === "light" ? "#fff" : theme.palette.background.default, 
            cursor: "pointer"}} p={2}
        >
            <Stack direction="row" alignItems="center" justifyContent={"space-between"}>
                <Stack spacing={2} direction="row" alignItems="center">
                    <Box>
                        { online ? 
                            <StyledBadge overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "right" }} variant="dot">
                                <Avatar src={img} />
                            </StyledBadge>
                            : <Avatar src={img} />
                        }
                    </Box>
                    
                    <Typography sx={{  wordWrap: "break-word" }} variant="subtitle2">{name || number}</Typography>
                </Stack>

                <Stack direction="row" alignItems={"center"} justifyContent="space-between">
                    <IconButton>
                        <Phone color="green" />
                    </IconButton>
                    <IconButton>
                        <VideoCamera color="green" />
                    </IconButton>
                </Stack>
                
            </Stack>
        </Box>
    )
}

export default CallElement