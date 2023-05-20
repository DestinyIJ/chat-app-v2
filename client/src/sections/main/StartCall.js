import React from 'react'
import { Dialog, DialogTitle, DialogContent, Slide, Stack, IconButton, Typography } from '@mui/material'

import { MagnifyingGlass, X } from 'phosphor-react'
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/search'
import { CallLogs } from '../../data'
import { CallElement } from '../../components'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />
})



const StartCall = ({ open, toggleDialog }) => (
    <>
        <Dialog
            fullWidth
            maxWidth="xs"
            open={open}
            TransitionComponent={Transition}
            keepMounted
            sx={{ p: 4 }}
            onClose={() => toggleDialog()}
        >
           <DialogTitle
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2.5
                }}
            >
                <Typography variant="h6">Start A Call</Typography>

                <IconButton onClick={() => toggleDialog()}>
                    <X />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Stack spacing={3}>
                    <Stack  sx={{ width: "100%"}}>
                        <Search>
                            <SearchIconWrapper>
                                <MagnifyingGlass color="#709CE6" />
                            </SearchIconWrapper>
                            <StyledInputBase placeholder="Search..." />
                        </Search> 
                    </Stack> 
                    <Stack spacing={2}>
                        {
                            CallLogs.map((call) => (
                                <CallElement key={call.id} {...call} />
                            ))
                        }
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    </>
)

export default StartCall