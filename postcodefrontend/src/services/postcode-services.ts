import axios from 'axios';

export const getAllSuburbs = async () => {
    const response = await axios.get("http://localhost:8080/suburb", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });

    return response.data;
}
