import { Box, Divider, IconButton, Link, Stack, Typography, useTheme } from '@mui/material'
import { MagnifyingGlass, Plus } from 'phosphor-react'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { ChatElement } from '../../components'
import { SimpleBarStyle } from '../../components/Scrollbar'
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/search'
import { ChatList } from '../../data'



const Group = () => {
    const theme = useTheme()

    return (
        <>
            <Stack direction="row" sx={{ width: "100%"}}>
                <Box
                    sx={{
                        height: "100vh",
                        backgroundColor: (theme) => theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background,
                        width: 320,
                        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)"
                    }}
                >
                    <Stack padding={3} spacing={2} maxHeight="100vh">
                        <Stack>
                            <Typography variant="h5">Groups</Typography>
                        </Stack>

                        <Stack sx={{ width: "100%"}}>
                            <Search>
                                <SearchIconWrapper>
                                    <MagnifyingGlass color="#709CE6" />
                                </SearchIconWrapper>
                                <StyledInputBase placeholder="Search..." />
                            </Search>
                        </Stack> 

                        <Stack direction={"row"} alignItems="center" justifyContent={"space-between"}>
                            <Link to="/auth/register" component={RouterLink} variant="subtitle2">
                                Create New Group
                            </Link>
                            <IconButton>
                                <Plus style={{ color: theme.palette.primary.main }} />
                            </IconButton>
                        </Stack>

                        <Divider />

                        <Stack
                            sx={{
                                flexGrow: 1,
                                overflowY: "scroll",
                                height: "100%",
                                '::-webkit-scrollbar' : { display: 'none'}
                            }}
                        >
                            <SimpleBarStyle timeout={500} clickOnTrack={false}>
                                <Stack>
                                    <Typography variant="subtitle2" sx={{ color: "#676667"}}>Pinned</Typography>
                                    {
                                        ChatList.filter((chat) => chat.pinned).map((pinnedChat) => (
                                            <ChatElement {...pinnedChat} key={pinnedChat.id}  />
                                        ))
                                    }
                                </Stack>

                                <Stack>
                                    <Typography variant="subtitle2" sx={{ color: "#676667"}}>All</Typography>
                                    {
                                        ChatList.filter((chat) => !chat.pinned).map((chat) => (
                                            <ChatElement {...chat} key={chat.id} />
                                        ))
                                    }
                                </Stack>
                            </SimpleBarStyle>
                        </Stack>
                    </Stack>   
                </Box>
            </Stack>
        </>
    )
}

export default Group
