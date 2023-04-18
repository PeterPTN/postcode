import Suburb from '../types/Suburb';
import axios from 'axios';

export const getAllSuburbs = async () => {
    try {
        const response = await axios.get("http://localhost:8080/suburb", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        });

        return response.data;
    } catch (error: any) {
        if (error.response.data.errors) {
            const fields = Object.keys(error.response.data.errors)
            const errorMessages: string[] = [];

            fields.forEach((field) => {
                const capitalisedField = field.charAt(0).toUpperCase() + field.slice(1);
                errorMessages.push(`${capitalisedField} - ${error.response.data.errors[field][0]}`);
            })

            throw new Error(`Failed to get all suburbs: ${errorMessages.join("\n")}`)
        }

        throw new Error("Failed to get all suburbs")
    }
}

export const createSuburb = async (suburbData: Suburb) => {
    try {
        await axios.post("http://localhost:8080/suburb", suburbData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            }
        });

        return true;
    } catch (error: any) {
        if (error.response.data.errors) {
            const errorFields = Object.keys(error.response.data.errors);
            const errorMessages: string[] = [];

            errorFields.forEach((field) => {
                const capitalisedField = field.charAt(0).toUpperCase() + field.slice(1);
                errorMessages.push(`${capitalisedField} - ${error.response.data.errors[field][0]}`);
            })

            throw new Error(`Failed to create a suburb: ${errorMessages.join("\n")}`)
        }

        throw new Error("Failed to create a suburb");
    }
}

export const deleteSuburb = async (id: number) => {
    try {
        await axios.delete(`http://localhost:8080/suburb/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            }
        });

        return true;
    } catch (error: any) {
        if (typeof (error.response.data) == "string") {
            throw new Error(error.response.data)
        }

        else if (error.response.data.message) {
            const field = Object.keys(error.response.data).join("");
            const capitalisedField = field.charAt(0).toUpperCase() + field.slice(1);

            throw new Error(`Failed to delete this suburb: ${capitalisedField} ${error.response.data.message}`)
        }

        throw new Error("Failed to delete this suburb");
    }
}

export const updateSuburb = async ({ id, newSuburbData }: { id: number, newSuburbData: Suburb }) => {
    try {
        await axios.patch(`http://localhost:8080/suburb/${id}`, newSuburbData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            }
        });
        
        return true;
    } catch (error: any) {
        if (error.response.data.errors) {
            const fields = Object.keys(error.response.data.errors);
            const errorMessages: string[] = [];

            fields.forEach((field) => {
                const capitalisedField = field.charAt(0).toUpperCase() + field.slice(1);
                errorMessages.push(`${capitalisedField} ${error.response.data.errors[field][0]}`);
            })

            throw new Error(`Failed to update this suburb: ${errorMessages.join("\n")}`)
        }
        throw new Error("Failed to update this suburb")
    }
}