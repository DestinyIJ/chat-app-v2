import React from "react";
import { Outlet } from "react-router-dom";


// Material-UI
import { Stack } from "@mui/material";

import SideBar from "./SideBar";


const DashboardLayout = () => {


  return (
    <Stack direction="row" sx={{ width: "100%", height: "100%"}}>
      {/* siderbar*/}
      <SideBar />
      
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
