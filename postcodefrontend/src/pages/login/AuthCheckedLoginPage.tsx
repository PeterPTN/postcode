import { withAuthCheck } from "../withAuthCheck"
import LoginPage from "./LoginPage"

const AuthCheckedLoginPage = () => {
    return withAuthCheck(LoginPage);
}

export default AuthCheckedLoginPage