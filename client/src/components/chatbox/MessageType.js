import React, { useState } from 'react'
import { Stack, Divider, Typography, Box, Card, CardContent, Link, CardMedia, CardActionArea, IconButton, Menu, MenuItem } from '@mui/material'
import { useTheme } from "@mui/material/styles"
import { DownloadSimple, Image, DotsThreeVertical } from 'phosphor-react'
import { Message_options } from '../../data'




export const TimeLine = ({ chat }) => {
    const theme = useTheme()

    return (
        <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Divider width="45%" />
            <Typography variant='caption' sx={{ color: theme.palette.text }}>{chat.text}</Typography>
            <Divider width="45%" />
        </Stack>
    )
}

const MessageOption = ({ incoming }) => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (e) => {
        setMenuOpen(prev => !prev)
        setAnchorEl(e.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
        setMenuOpen(false)
    }
    const onClickOption = (option) => {
        console.log(option)
    } 
    return (
       <>
        <DotsThreeVertical id='togggleMsgOpts' size={20} onClick={handleClick} />
        <Menu
            id='messageOptions'
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'togggleMsgOpts'
            }}
        >
            {
                Message_options.map((option, index) => {
                    if(option.action === "report" && !incoming) return null
                    return <MenuItem key={index} onClick={() => onClickOption(option.action)}>{option.title}</MenuItem>
                })
            }
        </Menu>
       </>
    )
}

export const TextMsg = ({ chat: { incoming, message, image, video, audio, reply, preview, subtype } }) => {
    const theme = useTheme()

    return (
      <Stack direction={incoming ? "row" : "row-reverse"} justifyContent={incoming ? "start" : "end"}>
        <Card sx={{ 
            maxWidth: 345,
            gap: 1,
            backgroundColor: incoming ?
                theme.palette.background.paper :
                theme.palette.primary.main 
        }}>
            {
                subtype==="doc" &&
                <Stack p={2} direction="row" spacing={3} alignItems="center"
                    sx={{
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: 1, maxWidth: 300
                    }}
                >
                    <Image size={48} />
                    <Typography variant={"caption"}>Abstract.png</Typography>
                    <IconButton>
                        <DownloadSimple />
                    </IconButton>
                </Stack>
            }
            {
                preview && 
                    <CardActionArea>
                        <CardMedia
                            component="img" height="140" width="320" sx={{ borderRadius: "10px" }}
                            image={preview} alt={message || "image preview"}
                        >
                            
                        </CardMedia>

                        <Stack spacing={2}>
                            <Stack p={2} spacing={3}
                                sx={{
                                    backgroundColor: theme.palette.background.paper,
                                    borderRadius: 1  
                                }}
                            >
                                <Stack spacing={2}>
                                    <Typography variant='subtitle2'>Create New App</Typography>
                                    <Typography variant='subtitle2' 
                                        sx={{ color: theme.palette.primary.main }} 
                                        component={Link}  to="//https://www.youtube.com"
                                    >
                                        www.youtube.com
                                    </Typography>
                                </Stack>
                                <Typography variant="body2" sx={{  wordWrap: "break-word" }} color={incoming ? theme.palette.text : "#fff"}>{message}</Typography>
                            </Stack>
                        </Stack>
                    </CardActionArea>
            }
            {
                reply && 
                <Box
                    p={1} m={1}
                    alignItems="center"
                    sx={{
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: 1, maxWidth: 300
                    }}
                >
                    <Typography variant="body2" sx={{  wordWrap: "break-word" }} color={theme.palette.text}>{message}</Typography>
                </Box>
            }
            {
                image && 
                <img style={{ height: 240, width: 320  }} src={image} alt={message} />
            }
            {
                audio && 
                <audio src={audio} />
            }
            {
                video && 
                <video src={video} />
            }
            {
                (message && !preview) &&  
                <CardContent sx={{ marginY: "0"}}>
                    <Typography variant="body2" sx={{  wordWrap: "break-word" }} color={incoming ? theme.palette.text : "#fff"}>{reply ? reply : message}</Typography>
                </CardContent>
            }
        </Card>
        <MessageOption incoming={incoming} />
      </Stack>
    )
}


