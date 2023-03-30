import { Box, Stack, IconButton, TextField, InputAdornment } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles"
import {  LinkSimple, PaperPlaneTilt, Smiley } from 'phosphor-react';

const StyledInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
        padding: "12px"
    }
}));

const Footer = () => {
    const theme = useTheme()

    return (
        <Box p={2.5} sx={{  
            width: '100%', 
            backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.paper,
            boxShadow: "2px 0px 2px rgba(0, 0, 0, 0.25)"
            }}
        >
            <Stack direction="row" alignItems="center" spacing={3}>
                <StyledInput  fullWidth placeholder='Write a message...' variant='filled' InputProps={{
                    disableUnderline: true, 
                    startAdornment: <InputAdornment position="end">
                        <IconButton>
                            <LinkSimple />
                        </IconButton>
                    </InputAdornment>,
                    endAdornment: <InputAdornment position='end'>
                        <IconButton>
                            <Smiley />
                        </IconButton>
                    </InputAdornment>
                }} />
                <Box sx={{
                    display: "flex", 
                    alignItems: "center", justifyContent: "center",
                    height: 48, width: 48, 
                    backgroundColor: theme.palette.primary.main, 
                    borderRadius: 1.5}}
                >
                    <IconButton>
                        <PaperPlaneTilt color='#fff' />
                    </IconButton>
                </Box>
            </Stack>
        </Box>
    )
}

export default Footer