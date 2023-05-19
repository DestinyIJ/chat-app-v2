import { Box, Stack, Typography, IconButton, Button, Avatar, InputBase, Divider, Badge } from "@mui/material";
import { useTheme } from "@mui/material/styles"
import { CircleDashed, MagnifyingGlass, ArchiveBox } from "phosphor-react";


import { ChatElement } from "../../components";
import { Search, SearchIconWrapper, StyledInputBase } from "../../components/search";
import { ChatList } from "../../data";




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
                        overflowY: 'scroll',
                        '::-webkit-scrollbar' : { display: 'none'}
                    }}
                >
                    <Stack spacing={2.5}>
                        <Stack spacing={1.5}>
                            <Typography variant="subtitle2" sx={{ color: "#676767"}}>Pinned</Typography>
                            {
                                ChatList.filter((chat) => chat.pinned).map((pinnedChat) => (
                                    <ChatElement {...pinnedChat} key={pinnedChat.id}  />
                                ))
                            }
                        </Stack>

                        <Stack spacing={1.5}>
                            <Typography variant="subtitle2" sx={{ color: "#676767"}}>All Chats</Typography>
                            {
                                ChatList.filter((chat) => !chat.pinned).map((chat) => (
                                    <ChatElement {...chat} key={chat.id} />
                                ))
                            }
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
}

export default Chats
