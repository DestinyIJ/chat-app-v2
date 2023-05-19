import { Box, Stack, Typography, Avatar, Badge } from "@mui/material";
import { useTheme } from "@mui/material/styles"
import StyledBadge from "./StyledBadge";


const ChatElement = ({id, img, name, msg, time, unread, online,}) => {
    const theme = useTheme()

    return (
        <Box key={id} sx={{ 
            width: "100%", borderRadius: 1, 
            backgroundColor: theme.palette.mode === "light" ? "#fff" : theme.palette.background.default, 
            cursor: "pointer"}} p={2}
        >
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" spacing={2}>
                    <Box>
                        { online ? 
                            <StyledBadge overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "right" }} variant="dot">
                                <Avatar src={img} />
                            </StyledBadge>
                            : <Avatar src={img} />
                        }
                    </Box>
                    <Stack spacing={0.3}>
                        <Typography sx={{  wordWrap: "break-word" }} variant="subtitle2">{name}</Typography>
                        <Typography variant="caption" noWrap={true}>{msg.length > 12 ? msg.substring(0,12) + '...' : msg}</Typography>
                    </Stack>
                </Stack>
                <Stack spacing={2} alignItems="center">
                    <Typography sx={{ fontWeight: 600}}>{time}</Typography>
                    <Badge color="primary" badgeContent={unread}></Badge>
                </Stack>
            </Stack>
        </Box>
    )
}

export default ChatElement