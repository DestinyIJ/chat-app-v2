import { Container, Stack } from "@mui/material";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import Logo from "../../assets/Images/logo.ico"
import { DEFAULT_PATH } from "../../config";
import { selectCurrentUser } from '../../redux/auth/auth.selector';


const MainLayout = () => {
  const currentUser = useSelector(selectCurrentUser)
  console.log(process.env.BASE_API_URL)
  if(currentUser) return <Navigate to={DEFAULT_PATH} />

  return (
    <>
      <Container sx={{ mt: 5}} maxWidth="sm">
        <Stack spacing={5}>
          <Stack sx={{ widht: "100%"}} direction="column" alignItems="center">
            <img src={Logo} alt="Logo" style={{ height: 120, width: 120 }} />
          </Stack>
        </Stack>

        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
