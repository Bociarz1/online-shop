import ReactDOM from "react-dom/client";
import App from './App';
import "./index.css";

import {
  createBrowserRouter, NavigateFunction,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import "./index.css";
import DashboardContent from "./components/DashboardContent/DashboardContent";
import {ContextProvidersWrapper} from "./context/ContextProvidersWrapper";
import Login from "./components/Login/Login";
import React, {useEffect} from "react";
import Loader from "./components/Loader/Loader";


const RedirectToDashboard = (): null => {
  const navigate: NavigateFunction = useNavigate();
  useEffect((): void => {
    navigate("/dashboard");
  }, [navigate]);
  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "signIn",
        element: <Login type={'login'}/>,
      },
      {
        path: "signOut",
        element: <Login type={'register'}/>,
      },
      {
        path: "dashboard",
        element: <DashboardContent />,
      },
    ],
  },
  {
    path: "*",
    element: <RedirectToDashboard />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as Element | DocumentFragment).render(
  <>
    <ContextProvidersWrapper>
    <RouterProvider router={router} fallbackElement={<Loader/>}/>
    </ContextProvidersWrapper>
  </>
);
