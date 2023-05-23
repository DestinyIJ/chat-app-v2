import axios from "axios";

import { BASE_API_URL } from "../config"

const axiosInstance = axios.create({
    baseURL: BASE_API_URL,
})

axios.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error.response && error.response.data) || "Something went wrong")

export default axiosInstance