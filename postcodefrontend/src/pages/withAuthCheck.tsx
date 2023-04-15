import { useAppSelector } from "../services/redux-services";
import { Navigate } from "react-router-dom";

export const withAuthCheck = (Component: React.ComponentType) => {
    const expirationTime = useAppSelector(state => state.auth.jwtExpirationDate);
    const currentTime = new Date().getTime();

    if (Component.name === "LoginPage" || Component.name === "RegisterPage") {
        if (expirationTime < currentTime) {
            return <Navigate to="/admin" />
        }
    }

    if (expirationTime >= currentTime) {
        return <Navigate to="/" />
    }

    return <Component />
}