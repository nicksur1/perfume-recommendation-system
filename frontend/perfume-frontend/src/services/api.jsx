import axios from "axios";

const API_URL = "http://localhost:4000"; // Your backend URL

export const getPerfumes = async () => {
    try {
        const response = await axios.get(`${API_URL}/perfumes`);
        return response.data;
    } catch (error) {
        console.error("Error fetching perfumes:", error);
        throw error;
    }
};
