import type Login from '../types/Login'
import axios from 'axios';
import Register from '../types/Register';

export const validateUser = async (data: Login | Register, formType: "register" | "login") => {
    try {
        const response = await axios.post(`http://localhost:8080/${formType}`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(response.data)

        const token = await response.data.token;
        localStorage.setItem('token', token);

        return true;
    } catch (error: any) {
        // console.log(error);
        return false;
    }
}