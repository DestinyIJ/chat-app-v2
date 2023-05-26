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


  if(!currentUser) return <Navigate to={LOGIN_PATH} />

  const user_id = currentUser._id
  useEffect(() => {
    if(!currentUser) return
    window.onload = function () {
      if(!window.location.hash) {
        window.location = window.location + "#loaded"
        window.location.reload()
      }
    }

    window.reload()
    if(!socket) {
      connectSocket(user_id)
    }

    socket.on("new_friend_request", ({ from, message }) => {
      dispatch(apiSuccess(message))
    })

    socket.on("friend_request_accepted", ({ message }) => {
      dispatch(apiSuccess(message))
    })

    socket.on("friend_request_sent", ({ message }) => {
      dispatch(apiSuccess(message))
    })

    socket.on("error", (error) => {
      dispatch(apiFailure(error.message))
    })

    return () => {
      socket.off("new_friend_request")
      socket.off("friend_request_accepted")
      socket.off("friend_request_sent")
      socket.off("error")
    }
  }, [currentUser, socket])

  return (
    <Stack direction="row" sx={{ width: "100%", height: "100%"}}>
      {/* siderbar*/}
      <SideBar />
      
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
