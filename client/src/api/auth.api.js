import axios from "./axios"

export const registerUser = async (userData) => {
    try {
       const response = await axios.post('/auth/register', 
        {...userData},
        {
            headers: {
                "Content-Type" : "application/json"
            }
        });
        const user = response.data.user;
        return user;
    } catch (error) {
        throw new Error(error);
    }
};

export const verifyRegisterOTP = async ({ email, otp }) => {
    try {
       const response = await axios.post('/auth/verify-otp', 
       { email, otp },
        {
            headers: {
                "Content-Type" : "application/json"
            }
        });
        const user = response.data;
        return user;
    } catch (error) {
        throw new Error(error);
    }
};

export const authenticateUser = async (credentials) => {
    try {
        const response = await axios.post('/auth/login', 
        {...credentials}, 
        {
            headers: {
                "Content-Type" : "application/json"
            }
        });
        const user = response.data.user;
        return user;
    } catch (error) {
        throw new Error(error);
    }
};

export const refreshTokenApi = async () => {
    try {
        const response = await axios.post('/auth/refresh-token');
        const accessToken = response.data.accessToken;
        return accessToken;
    } catch (error) {
        throw new Error(error);
    }
};

export const forgotPasswordApi = async ({ email }) => {
    try {
        await axios.post(
            '/auth/forgot-password', 
            { email }, 
            {
                headers: {
                    "Content-Type" : "application/json"
                }
            });
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
};

export const resetPasswordApi = async ({ token, password }) => {
    try {
        await axios.post(
            '/auth/reset-password', 
            { token, password }, 
            {
                headers: {
                    "Content-Type" : "application/json"
                }
            });
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
};

export const logoutApi = async () => {
    try {
        await axios.post('/auth/logout');
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
};
  