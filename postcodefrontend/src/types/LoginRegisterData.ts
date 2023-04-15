import Login from "./Login";
import Register from "./Register";

export interface LoginRegisterData {
    data: Login | Register,
    formType: string // Won't accept string-literal types ie. FormType
}