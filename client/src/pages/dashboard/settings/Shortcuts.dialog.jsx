import { forwardRef } from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Slide, Stack, Typography, useTheme } from "@mui/material"

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />
})

const shortcuts = [
    {
        key: 0,
        title: "Mark as unread",
        combination: ["Cmd", "Shift", "U"]
    },
    {
        key: 1,
        title: "Mute",
        combination: ["Cmd", "Shift", "M"]
    },
    {
        key: 2,
        title: "Archive Chat",
        combination: ["Cmd", "Shift", "E"]
    },
    {
        key: 3,
        title: "Delete Chat",
        combination: ["Cmd", "Shift", "D"]
    },
    {
        key: 4,
        title: "Pin Chat",
        combination: ["Cmd", "Shift", "P"]
    },
    {
        key: 5,
        title: "Search Chat",
        combination: ["Cmd", "F"]
    },
    {
        key: 6,
        title: "Archive Chat",
        combination: ["Cmd", "Shift", "E"]
    },
    {
        key: 7,
        title: "Archive Chat",
        combination: ["Cmd", "Shift", "E"]
    },
    {
        key: 8,
        title: "Archive Chat",
        combination: ["Cmd", "Shift", "E"]
    },
    {
        key: 9,
        title: "Next Chat",
        combination: ["Cmd", "Tab"]
    },
    {
        key: 10,
        title: "Previous Chat",
        combination: ["Cmd", "Shift", "Tab"]
    },
    {
        key: 11,
        title: "New Group",
        combination: ["Cmd", "Shift", "N"]
    },
    {
        key: 12,
        title: "Profile & About",
        combination: ["Cmd", "P"]
    },
    {
        key: 13,
        title: "Inrease Speed of Voice Message",
        combination: ["Shift", "."]
    },
    {
        key: 14,
        title: "Decrease Speed of Voice Message",
        combination: ["Shift",  ","]
    },
    {
        key: 15,
        title: "Settings",
        combination: ["Shift", "S"]
    },
    {
        key: 16,
        title: "Emoji Panel",
        combination: ["Cmd", "E"]
    },
    {
        key: 17,
        title: "Sticker Panel",
        combination: ["Cmd", "5"]
    },
]

const ShortcutDialog = ({ open, toggleDialog }) => {
    const theme = useTheme()

    return (
        <Dialog
            fullWidth
            maxWidth="md"
            sx={{ p: 4 }}
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => toggleDialog("SHORTCUTS")}
        >
            <DialogTitle>Keyboard Shortcuts</DialogTitle>
            <DialogContent 
                sx={{ 
                    mt: 4,
                    overflowY: 'scroll',
                    '::-webkit-scrollbar' : { 
                        width: "12px"
                    },
                    '::-webkit-scrollbar-track' : {
                        backgroundColor: theme.palette.mode === "light" ? "#FFF" : theme.palette.background.default
                    },
                    '::-webkit-scrollbar-thumb' : {
                        background: theme.palette.grey[500],
                        borderRadius: "20px",
                        border: `3px solid ${theme.palette.grey[500]}`
                    }
                }}
            >
                <Grid container spacing={3}>
                    {
                        shortcuts.map(({ key, title, combination}) => (
                            <Grid item key={key} xs={6}>
                                <Stack sx={{ width: "100%"}} justifyContent="space-between" spacing={1}
                                    direction="row" alignItems={"center"}
                                >
                                    <Typography variant="caption" sx={{ fontSize: 14 }}>{title}</Typography>
                                    <Stack spacing={1} direction={"row"}>
                                        {
                                            combination.map((key, i) => (
                                                <Button key={i} disabled variant="contained" sx={{ color: "#212121"}}>
                                                    {key}
                                                </Button>
                                            ))
                                        }
                                    </Stack>
                                </Stack>
                            </Grid>
                        ))
                    }
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => toggleDialog("SHORTCUTS")}>OK</Button>
            </DialogActions>

        </Dialog>
    )
}

export default ShortcutDialog