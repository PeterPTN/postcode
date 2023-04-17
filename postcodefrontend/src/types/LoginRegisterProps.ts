import Login from "./Login";
import Register from "./Register";

export default interface LoginRegisterProps {
    data: Login | Register,
    formType: string // Won't accept string-literal types ie. FormType
}