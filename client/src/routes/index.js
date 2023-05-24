import { Suspense, lazy, useEffect } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { useDispatch } from 'react-redux';

// layouts
import DashboardLayout from "../layouts/dashboard";
import MainLayout from "../layouts/main"

// config
import { DEFAULT_PATH, LOGIN_PATH } from "../config";
import LoadingScreen from "../components/LoadingScreen";

import { refreshTokenRequest } from "../redux/auth/auth.action"


const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
    const dispatch = useDispatch();

    useEffect(() => {
      // Dispatch refreshTokenRequest action periodically
      const interval = setInterval(() => {
        dispatch(refreshTokenRequest());
      }, 3600000); // Refresh token every 30 minutes

      return () => clearInterval(interval);
    }, [dispatch]);

    return useRoutes([
      {
        path: "/auth",
        element: <MainLayout />,
        children: [
          { element: <LoginPage />, path: "login"},
          { element: <RegisterPage />, path: "register"},
          { element: <VerifyRegisterPage />, path: "register/verify"},
          { element: <ForgotPasswordPage />, path: "forgot-password"},
          { element: <ResetPasswordPage />, path: "reset-password"}
        ]
      },
      {
        path: "/",
        element: <DashboardLayout />,
        children: [
          { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
          { path: "chat", element: <ChatPage /> },
          { path: "settings", element: <Settings /> },
          { path: "group", element: <GroupPage /> },
          { path: "call", element: <CallPage /> },
          { path: "profile", element: <ProfilePage /> },
          { path: "404", element: <Page404 /> },
          { path: "*", element: <Navigate to="/404" replace /> },
        ],
      },
      { path: "*", element: <Navigate to="/404" replace /> },
    ]);
}

const ChatPage = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp")),
);

const GroupPage = Loadable(
  lazy(() => import("../pages/dashboard/Group")),
);

const CallPage = Loadable(
  lazy(() => import("../pages/dashboard/Call")),
);

const ProfilePage = Loadable(
  lazy(() => import("../pages/dashboard/Profile")),
);

const LoginPage = Loadable(
  lazy(() => import("../pages/auth/Login")),
);
const RegisterPage = Loadable(
  lazy(() => import("../pages/auth/Register")),
);

const VerifyRegisterPage = Loadable(
  lazy(() => import("../pages/auth/VerifyRegister")),
);
const ForgotPasswordPage = Loadable(
  lazy(() => import("../pages/auth/ForgotPassword")),
);
const ResetPasswordPage = Loadable(
  lazy(() => import("../pages/auth/ResetPassword")),
);

const Settings = Loadable(lazy(() => import("../pages/dashboard/settings/Settings")))
const Page404 = Loadable(lazy(() => import("../pages/Page404")));
