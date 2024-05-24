import { useContext, useEffect } from "react";
import {NavigateFunction, useNavigate} from "react-router-dom";
import { AuthContext } from "../context/authContext";

const useAuth = (): void => {
    const navigate: NavigateFunction = useNavigate();
    const {authUser} = useContext(AuthContext)
    useEffect(() => {
        const authUser: string | null = localStorage.getItem('username')
        if (!authUser) {
            navigate("/signIn");
        } else {
            navigate("/dashboard");
        }
    },[authUser]);
};

export default useAuth;