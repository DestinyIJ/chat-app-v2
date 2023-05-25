import axios from "axios";

import { store } from "../redux/store";
import { BASE_API_URL } from "../config"

const axiosInstance = axios.create({
    baseURL: BASE_API_URL,
    headers: {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
		Accept: "application/json",
	},
})



axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error.response && error.response.data) || "Something went wrong")

axiosInstance.interceptors.request.use(
    config => {
        // Retrieve the bearer token from your Redux store
        const bearerToken = store.getState().auth.accessToken;
    
        // Add the bearer token to the Authorization header
        if (bearerToken) {
            config.headers['Authorization'] = `Bearer ${bearerToken}`;
        }
    
        return config;
    },
    error => {
        return Promise.reject(error);
    }
    );
export default axiosInstance