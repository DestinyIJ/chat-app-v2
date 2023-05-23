import { faker } from '@faker-js/faker'
import { Avatar, Box, Divider, IconButton, Stack, Typography } from '@mui/material'
import { useTheme } from "@mui/material/styles"
import { Bell, CaretLeft, Image, Info, Key, Keyboard, Lock, Note, PencilCircle } from 'phosphor-react'
import { useReducer } from 'react'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import ShortcutDialog from './Shortcuts.dialog'
import ThemeDialog from './Theme.dialog'


const INITIAL_DIALOG = {
    shortcuts: false,
    theme: false
}

const dialogreducer = (state, action) => {
    switch (action.type) {
      case "SHORTCUTS":
        return {
            ...INITIAL_DIALOG,
            shortcuts: !state.shortcuts,
            theme: false
        }
    case "THEME":
        return {
            ...INITIAL_DIALOG,
            theme: !state.theme
        }
      default:
        return state;
    }
  };

const Settings = () => {
    const theme = useTheme()
    const [dialog, dispatchDialog] = useReducer(dialogreducer, INITIAL_DIALOG)

    const navigate = useNavigate()

    const toggleDialog = (action) => {
        dispatchDialog({ type: action })
        console.log(dialog)
    }

    const list = [
        {
            key: 0,
            icon: <Bell size={21} />,
            title: "Notifications",
            onclick: () => {}
        },
        {
            key: 1,
            icon: <Lock size={21} />,
            title: "Notifications",
            onclick: () => {}
        },
        {
            key: 2,
            icon: <Key size={21} />,
            title: "Security",
            onclick: () => {}
        },
        {
            key: 3,
            icon: <PencilCircle size={21} />,
            title: "Theme",
            onclick: () => toggleDialog("THEME")
        },
        {
            key: 4,
            icon: <Image size={21} />,
            title: "Chat Wallpaper",
            onclick: () => {}
        },
        {
            key: 5,
            icon: <Note size={21} />,
            title: "Request Account Info",
            onclick: () => {}
        },
        {
            key: 6,
            icon: <Keyboard size={21} />,
            title: "Keyboard shortcuts",
            onclick: () => toggleDialog("SHORTCUTS")
        },
        {
            key: 7,
            icon: <Info size={21} />,
            title: "Help",
            onclick: () => {}
        },
    ]

    return (
        <>
        <Stack direction={"row"} sx={{ width: "100%" }}>
            {/* Left Panel */}
            <Box
                sx={{
                    height: '100vh',
                    width: 320,
                    backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background,
                    overflowY: 'scroll',
                    boxShadow: "0px 0px 5px rgba(0,0,0,0.35)",
                    '::-webkit-scrollbar': { display: 'none' }
                }}
            >
                <Stack p={4} spacing={5}>
                    <Stack direction={"row"} alignItems={"center"} spacing={3}>
                        <IconButton onClick={() => navigate(-1)}>
                            <CaretLeft size={24} color={"#4B4B4B"} />
                        </IconButton>
                        <Typography variant='h6'>Settings</Typography>
                    </Stack>

                    {/* profile */}
                    <Stack direction={"row"} spacing={3}>
                        <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} sx={{ width: 56, height: 56}} />
                        <Stack spacing={0.5}>
                            <Typography variant="article">{faker.name.fullName()}</Typography>
                            <Typography variant="body2">{faker.random.words()}</Typography>
                        </Stack>
                    </Stack>

                    {/* options */}
                    <Stack spacing={3}>
                    {
                        list.map(({ key, icon, title, onclick}) => (
                            <Fragment key={key}>
                                <Stack spacing={2} sx={{ cursor: "pointer"}} onClick={onclick}>
                                    <Stack direction={"row"} spacing={2} alignItems={"center"}>
                                        {icon}
                                        <Typography variant='body2'>{title}</Typography>
                                    </Stack>
                                    { (key + 1) < list.length && <Divider />}
                                </Stack>
                            </Fragment>
                        ))
                    }
                    </Stack>
                </Stack>
            </Box>

            {/* Right Panel */}
        </Stack>
        <ShortcutDialog open={dialog.shortcuts} toggleDialog={toggleDialog} />
        <ThemeDialog open={dialog.theme} toggleDialog={toggleDialog} />
        </>
    )
}

export default Settings
