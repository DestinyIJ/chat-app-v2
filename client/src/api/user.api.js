
export const getUsers = async () => {
    try {
        const response = await axios.get('/users');

        return response.data
    } catch (error) {
        throw new Error(error);
    }
};

export const searchUsers = async (searchParams) => {
    
    try {
        const response = await axios.get('/users/search', searchParams);

        return response.data
    } catch (error) {
        throw new Error(error);
    }
};

export const getUser = async (userId) => {
    try {
        const response = await axios.get(`/users/${userId}`);

        return response.data
    } catch (error) {
        throw new Error(error);
    }
};

export const getFriends = async () => {
    try {
        const response = await axios.get('/users/friends');

        return response.data
    } catch (error) {
        throw new Error(error);
    }
};

export const getFriendRequests = async () => {
    try {
        const response = await axios.get('/users/friend-requests');

        return response.data
    } catch (error) {
        throw new Error(error);
    }
};