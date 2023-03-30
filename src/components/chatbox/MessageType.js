import React from 'react'
import { Stack, Divider, Typography, Box, Card, CardContent, Link, CardMedia, CardActionArea, IconButton } from '@mui/material'
import { useTheme } from "@mui/material/styles"
import { DownloadSimple, Image } from 'phosphor-react'

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

export const TextMsg = ({ chat: { incoming, message, image, video, audio, reply, preview, subtype } }) => {
    const theme = useTheme()

    return (
      <Stack direction="row" justifyContent={incoming ? "start" : "end"}>
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
                        <Stack p={2} spacing={3} alingItems="start"
                            sx={{
                                backgroundColor: theme.palette.background.paper,
                                borderRadius: 1  
                            }}
                        >
                            <Stack sapcing={2}>
                                <Typography variant='subtitle2'>Create New App</Typography>
                                <Typography variant='subtitle2' 
                                    sx={{ color: theme.palette.primary.main }} 
                                    component={Link}  to="//https://www.youtube.com"
                                >
                                    www.fvkyou.com
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
      </Stack>
    )
}

export const Reply = () => {
    return (
      <div>MessageType</div>
    )
  }

