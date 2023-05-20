import React from "react";
import { Navigate, Outlet } from "react-router-dom";


// Material-UI
import { Stack } from "@mui/material";

import SideBar from "./SideBar";
import { LOGIN_PATH } from "../../config";

const isAuthenticated = true

const DashboardLayout = () => {

  if(!isAuthenticated) return <Navigate to={LOGIN_PATH} />

  return (
    <Stack direction="row" sx={{ width: "100%", height: "100%"}}>
      {/* siderbar*/}
      <SideBar />
      
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
