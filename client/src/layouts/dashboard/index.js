import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '../../redux/auth/auth.selector';
import { apiSuccess, apiFailure } from "../../redux/api/api.action";


// Material-UI
import { Stack } from "@mui/material";

import SideBar from "./SideBar";
import { LOGIN_PATH } from "../../config";
import { connectSocket, socket } from "../../utils/socket";


const DashboardLayout = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)


  useEffect(() => {
    if(!currentUser) return
    
    const user_id = currentUser._id

    // window.onload = function () {
    //   if(!window.location.hash) {
    //     window.location = window.location + "#loaded"
    //     window.location.reload()
    //   }
      
    // }

  

    if(!socket) {
      connectSocket(user_id)
    }

    socket.on("friend_request", ({ from, message }) => {
      dispatch(apiSuccess(message))
    })

    socket.on("friend_request_accepted", ({ message }) => {
      dispatch(apiSuccess(message))
    })

    socket.on("friend_request_sent", ({ message }) => {
      dispatch(apiSuccess(message))
    })

    socket.on("error", (error) => {
      dispatch(apiFailure(error))
    })

    return () => {
      socket.off("new_friend_request")
      socket.off("friend_request_accepted")
      socket.off("friend_request_sent")
      socket.off("error")
    }
  }, [currentUser, socket])

  if(!currentUser) return <Navigate to={LOGIN_PATH} />

  return (
    <Stack direction="row" sx={{ width: "100%", height: "100%"}}>
      {/* siderbar*/}
      <SideBar />
      
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
