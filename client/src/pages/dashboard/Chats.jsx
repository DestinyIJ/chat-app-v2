import { Box, Stack, Typography, IconButton, Button, Avatar, InputBase, Divider, Badge } from "@mui/material";
import { styled, alpha, useTheme } from "@mui/material/styles"
import { CircleDashed, MagnifyingGlass, ArchiveBox } from "phosphor-react";


import { StyledBadge } from "../../components";
import { ChatList } from "../../data";



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

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: 20,
    backgroundColor: alpha(theme.palette.background.default, 1),
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    padding: theme.spacing(1,0),
    display: "flex",
    alignItems: "center"
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0,2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1,1,0,0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        width: "100%"
    }
}))



const Chats = () => {
    const theme = useTheme()

    return (
        <Box
            sx={{
                position: "relative",
                width: 320, 
                backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.paper,
                boxShadow: "0px 0px 2px rgba(0,0,0,0.25)"
            }}
        >
            <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="h5">
                        Chats
                    </Typography>
                    <IconButton>
                        <CircleDashed />
                    </IconButton>
                </Stack>

                <Stack sx={{ width: "100%"}}>
                    <Search>
                        <SearchIconWrapper>
                            <MagnifyingGlass color="#709CE6" />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder="Search..." />
                    </Search>
                </Stack>

                <Stack spacing={1.5} >
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                        <ArchiveBox size={24} />
                        <Button>Archive</Button>
                    </Stack>
                    <Divider />
                </Stack>

                <Box
                    sx={{
                        flexGrow: 1,
                        height: '100%',
                        overflow: 'scroll',
                        '::-webkit-scrollbar' : { display: 'none'}
                    }}
                >
                    <Stack spacing={2.2}>
                        <Typography variant="subtitle2" sx={{ color: "#676767"}}>Pinned</Typography>
                        {
                            ChatList.filter((chat) => chat.pinned).map((pinnedChat) => (
                                <ChatElement {...pinnedChat} key={pinnedChat.id}  />
                            ))
                        }

                        <Typography variant="subtitle2" sx={{ color: "#676767"}}>All Chats</Typography>
                        {
                            ChatList.filter((chat) => !chat.pinned).map((chat) => (
                                <ChatElement {...chat} key={chat.id} />
                            ))
                        }
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
}

export default Chats
