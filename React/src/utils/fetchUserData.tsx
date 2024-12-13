import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Cookies } from "react-cookie";

const fetchUserData = async (token: string) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const cookies = new Cookies;
    try {
        const token = cookies.get("userToken");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const decodedToken = jwtDecode<{ id: string }>(token);
        const response = await axios.get(`${apiUrl}user/${decodedToken.id}`, { headers });

        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};

export default fetchUserData;