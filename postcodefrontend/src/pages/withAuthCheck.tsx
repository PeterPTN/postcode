import { useAppSelector } from "../services/redux-services";
import { Navigate } from "react-router-dom";

export const withAuthCheck = (Component: React.ComponentType) => {
    const expirationTime = useAppSelector(state => state.auth.jwtExpirationDate);
    const currentTime = new Date().getTime();
    const safePages = ["LoginPage", "RegisterPage"];

    // Authenticated
    if (expirationTime !== null && expirationTime < currentTime) {
        // Not safe path return component
        if (!safePages.includes(Component.name)) {
            return <Component />
        }

        // Is safe path so admin page
        return <Navigate to="/admin" />
    }

    // Not Authenticated or is expired
    // If not safe page redirect to login page
    if (!safePages.includes(Component.name)) {
        return <Navigate to="/" />
    }

    // Is safe page so return component
    return <Component />
}