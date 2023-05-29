import React, { useState, useEffect } from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide, Stack, Tab, Tabs } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { selectUsers, selectFriends, selectFriendRequests } from '../../redux/user/user.selector'
import { getFriendsRequest, getUsersRequest, getFriendRequestsRequest } from '../../redux/user/user.action'
import { FriendRequestComponent, UserComponent, FriendComponent } from '../../components'

const UsersList = () => {
    const dispatch = useDispatch()
    const users = useSelector(selectUsers)

    useEffect(() => {
        dispatch(getUsersRequest())
    }, [dispatch])

    return (
        <>
            {
                users.map((user) => (
                    <>
                        <UserComponent key={user._id} {...user} />
                    </>
                ))
            }
        </>
    )
}

const FriendsList = () => {
    const dispatch = useDispatch()
    const friends = useSelector(selectFriends)

    useEffect(() => {
        dispatch(getFriendsRequest())
    }, [dispatch])

    return (
        <>
            {
                friends.map((friend) => (
                    <>
                        <FriendComponent key={friend._id} {...friend} />
                    </>
                ))
            }
        </>
    )
}

const FriendRequestsList = () => {
    const dispatch = useDispatch()
    const friendRequests = useSelector(selectFriendRequests)

    useEffect(() => {
        dispatch(getFriendRequestsRequest())
    }, [dispatch])

    return (
        <>
            {
                friendRequests.map((friendRequest) => (
                    <>
                        <FriendRequestComponent key={friendRequest._id} {...friendRequest} />
                    </>
                ))
            }
        </>
    )
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />
})

const Friends = ({ open, toggleDialog }) => {
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            fullWidth
            maxWidth="xs"
            sx={{ p: 4 }}
            onClose={() => toggleDialog()}
        >

            <DialogTitle>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Explore" />
                    <Tab label="Friends" />
                    <Tab label="Friend Requests" />
                </Tabs>
            </DialogTitle>
            <DialogContent>
                <Stack>
                    <Stack>
                        {
                            (() => {
                                switch (value) {
                                    case 0:
                                        return <UsersList />
                                    case 1:
                                        return <FriendsList />
                                    case 2:
                                        return <FriendRequestsList />
                                    default:
                                        break
                                }
                            })()
                        }
                    </Stack>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => toggleDialog()}>Cancel</Button>
                <Button>Block</Button>
            </DialogActions>

        </Dialog>
    )
}

export default Friends