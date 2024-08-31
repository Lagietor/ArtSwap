import axios from "axios";
import { jwtDecode } from "jwt-decode";

const fetchUserData = async (token: string) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
        const decodedToken = jwtDecode<{ id: string }>(token);
        const response = await axios.get(`${apiUrl}user/${decodedToken.id}`);

        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};

export default fetchUserData;