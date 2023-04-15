import { withAuthCheck } from "../withAuthCheck"
import RegisterPage from "./RegisterPage"

const AuthCheckedRegisterPage = () => {
    return withAuthCheck(RegisterPage);
}

export default AuthCheckedRegisterPage