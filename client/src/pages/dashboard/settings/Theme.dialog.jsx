import { forwardRef } from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material"

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />
})

const ThemeDialog = ({ open, toggleDialog }) => {

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => toggleDialog("THEME")}
        >
            <DialogTitle>Set Theme</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Theme settings here
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => toggleDialog("THEME")}>OK</Button>
            </DialogActions>

        </Dialog>
    )
}

export default ThemeDialog