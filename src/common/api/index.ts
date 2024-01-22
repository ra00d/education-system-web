import axios from "axios";
export const API_BASE_URL = "http://localhost:3000";
const apiClient = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
	withCredentials: true,
});
export default apiClient;
