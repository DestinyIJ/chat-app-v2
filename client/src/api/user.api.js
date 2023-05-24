
export const getUsers = async ({ accessToken }) => {
    try {
        const response = await axios.get('/user',  
            {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${accessToken}`
                }
            });

        return response.data
    } catch (error) {
        throw new Error(error);
    }
};

export const searchUsers = async ({ accessToken }) => {
    const params = {
        firstName: 'John',
        lastName: 'Doe',
      };
    try {
        const response = await axios.get('/user',{ params }, 
            {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${accessToken}`
                }
            });

        return response.data
    } catch (error) {
        throw new Error(error);
    }
};

export const getUser = async ({ accessToken, userId }) => {
    try {
        const response = await axios.get(`/user/${userId}`,  
            {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${accessToken}`
                }
            });

        return response.data
    } catch (error) {
        throw new Error(error);
    }
};

export const getFriends = async ({ accessToken }) => {
    try {
        const response = await axios.get('/user/friends',  
            {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${accessToken}`
                }
            });

        return response.data
    } catch (error) {
        throw new Error(error);
    }
};

export const getFriendRequests = async ({ accessToken }) => {
    try {
        const response = await axios.get('/user/friend-requests',  
            {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${accessToken}`
                }
            });

        return response.data
    } catch (error) {
        throw new Error(error);
    }
};