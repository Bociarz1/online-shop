import "./App.css";
import {Outlet, } from "react-router-dom";
import AppWrapper from './components/AppWrapper/AppWrapper';
import Content from './components/Content/Content';
import Header from "./components/Header/Header";
import useAuth from "./hooks/useAuth";
import React, {useContext} from "react";
import Footer from "./components/Footer/Footer";
import {AuthContext} from "./context/authContext";

function App(): React.JSX.Element {
    const {authUser} = useContext(AuthContext)

    useAuth();
  return (
    <AppWrapper>
        {!!authUser.username &&
            <>
            <Header />
            <Content>
            <Outlet />
            </Content>
            <Footer>
            footer
            </Footer>
            </>
        }
        {!authUser.username &&
            <>
            <Outlet />
            </>
        }

    </AppWrapper>
  );
}
export default App;