import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '../../redux/auth/auth.selector';


// Material-UI
import { Stack } from "@mui/material";

import SideBar from "./SideBar";
import { LOGIN_PATH } from "../../config";


const DashboardLayout = () => {
  const currentUser = useSelector(selectCurrentUser)


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
