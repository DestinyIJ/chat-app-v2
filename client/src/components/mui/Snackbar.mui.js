import React, { useState } from 'react'
import MuiSnackbar from '@mui/material/Snackbar'
import MuiAlert from "@mui/material/Alert"
import { useEffect } from 'react'

const Alert = React.forwardRef((props, ref) => {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const Snackbar = ({ 
    vertical = "top", 
    horizontal = "center",  
    autoHideDuration = 4000, 
    message,
    error,
    success }) => {
    
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if(!message) return
        
        setOpen(true)
    }, [message])

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            {
                open && message && 
                <MuiSnackbar 
                    anchorOrigin={{vertical,horizontal}}
                    open={open}
                    autoHideDuration={autoHideDuration}
                    key={vertical + horizontal}
                    onClose={handleClose}
                >
                    <Alert
                        onClose={handleClose}
                        severity={error ? "error" : success ? "success" :"warning"}
                        sx={{ width: "100%" }}
                    >
                        {message}
                    </Alert>
                </MuiSnackbar>
            }
        </>
    )
}

export default Snackbar
