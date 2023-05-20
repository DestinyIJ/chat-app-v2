import { Box, Stack, Typography, Avatar, Badge, IconButton } from "@mui/material";
import { ArrowBendDownLeft, ArrowBendRightUp, ArrowDownLeft, ArrowUpRight, Phone } from "phosphor-react";
import StyledBadge from "./StyledBadge";


const CallLogElement = ({id, img, name, number, time, incoming, missed, online }) => {

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
                    
                    <Stack spacing={0.3}>
                        <Typography sx={{  wordWrap: "break-word" }} variant="subtitle2">{name || number}</Typography>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                            { incoming ?  <ArrowDownLeft color={missed ? "red" : "green"} /> : <ArrowUpRight color="green" />}
                            <Typography variant="caption">Yesterday {time}</Typography>
                        </Stack>
                    </Stack>
                </Stack>

                    <IconButton>
                        <Phone color="green" />
                    </IconButton>
                
            </Stack>
        </Box>
    )
}

export default CallLogElement