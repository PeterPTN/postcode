import type Login from '../types/Login'
import FormType from '../types/Form';
import Register from '../types/Register';
import axios from 'axios';

interface LoginRegisterData {
    data: Login | Register,
    formType: string // Won't accept string-literal types ie. FormType
}

export const validateUser = async ({ data, formType }: LoginRegisterData) => {
    try {
        const response = await axios.post(`http://localhost:8080/${formType}`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // console.log(response.data)

        // Store is session storage
        // Or some otherway with an expiration date
        const token = await response.data.token;
        localStorage.setItem('token', token);

        return true;
    } catch (error: any) {
        // console.log(error);
        return false;
    }
}