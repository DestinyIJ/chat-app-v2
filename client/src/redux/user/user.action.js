import userActionTypes from "./user.types";
import apiActionTypes from "../api/api.types";

// get friend requests action
export const getFriendRequestsRequest = () => (dispatch) => {
    dispatch({
        type: userActionTypes.GET_FRIEND_REQUESTS_REQUEST,
    })

    dispatch({
        type: apiActionTypes.API_REQUEST,
    })

    setTimeout(() => {
        dispatch({
            type: apiActionTypes.API_RESET,
        })
    }, 4000);
};

export const getFriendRequestsSuccess = (data) => (dispatch) => {
    dispatch({
        type: userActionTypes.GET_FRIEND_REQUESTS_SUCCESS,
        payload: data.friend,
    })
    dispatch({
        type: apiActionTypes.API_SUCCESS,
        payload: data.message,
    })
    setTimeout(() => {
        dispatch({
            type: apiActionTypes.API_RESET,
        })
    }, 4000);
};

export const getFriendRequestsFailure = (error) => (dispatch) => {
    dispatch({
        type: userActionTypes.GET_FRIEND_REQUESTS_FAILURE,
        payload: error,
    })
    dispatch({
        type: apiActionTypes.API_FAILURE,
        payload: error
    })
    setTimeout(() => {
        dispatch({
            type: apiActionTypes.API_RESET,
        })
    }, 4000);
};

// get friends actions
export const getFriendsRequest = () => (dispatch) => {
    dispatch({
        type: userActionTypes.GET_FRIENDS_REQUEST,
    })

    dispatch({
        type: apiActionTypes.API_REQUEST,
    })

    setTimeout(() => {
        dispatch({
            type: apiActionTypes.API_RESET,
        })
    }, 4000);
};

export const getFriendsSuccess = (data) => (dispatch) => {
    dispatch({
        type: userActionTypes.GET_FRIENDS_SUCCESS,
        payload: data.user,
    })
    dispatch({
        type: apiActionTypes.API_SUCCESS,
        payload: data.message,
    })
    setTimeout(() => {
        dispatch({
            type: apiActionTypes.API_RESET,
        })
    }, 4000);
};

export const getFriendsFailure = (error) => (dispatch) => {
    dispatch({
        type: userActionTypes.GET_FRIENDS_FAILURE,
        payload: error,
    })
    dispatch({
        type: apiActionTypes.API_FAILURE,
        payload: error
    })
    setTimeout(() => {
        dispatch({
            type: apiActionTypes.API_RESET,
        })
    }, 4000);
};

// get users actions
export const getUsersRequest = () => (dispatch) => {
    dispatch({
        type: userActionTypes.GET_USERS_REQUEST,
    })

    dispatch({
        type: apiActionTypes.API_REQUEST,
    })

    setTimeout(() => {
        dispatch({
            type: apiActionTypes.API_RESET,
        })
    }, 4000);
};

export const getUsersSuccess = (data) => (dispatch) => {
    dispatch({
        type: userActionTypes.GET_USERS_SUCCESS,
        payload: data.users,
    })
    dispatch({
        type: apiActionTypes.API_SUCCESS,
        payload: data.message,
    })
    setTimeout(() => {
        dispatch({
            type: apiActionTypes.API_RESET,
        })
    }, 4000);
};

export const getUsersFailure = (error) => (dispatch) => {
    dispatch({
        type: userActionTypes.GET_USERS_FAILURE,
        payload: error,
    })
    dispatch({
        type: apiActionTypes.API_FAILURE,
        payload: error
    })
    setTimeout(() => {
        dispatch({
            type: apiActionTypes.API_RESET,
        })
    }, 4000);
};

// get users actions
export const getUserRequest = (id) => (dispatch) => {
    dispatch({
        type: userActionTypes.GET_USER_REQUEST,
        payload: id
    })

    dispatch({
        type: apiActionTypes.API_REQUEST,
    })

    setTimeout(() => {
        dispatch({
            type: apiActionTypes.API_RESET,
        })
    }, 4000);
};

export const getUserSuccess = (data) => (dispatch) => {
    dispatch({
        type: userActionTypes.GET_USER_SUCCESS,
        payload: data.user,
    })
    dispatch({
        type: apiActionTypes.API_SUCCESS,
        payload: data.message,
    })
    setTimeout(() => {
        dispatch({
            type: apiActionTypes.API_RESET,
        })
    }, 4000);
};

export const getUserFailure = (error) => (dispatch) => {
    dispatch({
        type: userActionTypes.GET_USER_FAILURE,
        payload: error,
    })
    dispatch({
        type: apiActionTypes.API_FAILURE,
        payload: error
    })
    setTimeout(() => {
        dispatch({
            type: apiActionTypes.API_RESET,
        })
    }, 4000);
};

// search users action
export const searchUsersRequest = (searchData) => (dispatch) => {
    dispatch({
        type: userActionTypes.SEARCH_USERS_REQUEST,
        payload: searchData,
    })

    dispatch({
        type: apiActionTypes.API_REQUEST,
    })

    setTimeout(() => {
        dispatch({
            type: apiActionTypes.API_RESET,
        })
    }, 4000);
};

export const searchUsersSuccess = (data) => (dispatch) => {
    dispatch({
        type: userActionTypes.SEARCH_USERS_SUCCESS,
        payload: data.user,
    })
    dispatch({
        type: apiActionTypes.API_SUCCESS,
        payload: data.message,
    })
    setTimeout(() => {
        dispatch({
            type: apiActionTypes.API_RESET,
        })
    }, 4000);
};

export const searchUsersFailure = (error) => (dispatch) => {
    dispatch({
        type: userActionTypes.SEARCH_USERS_FAILURE,
        payload: error,
    })
    dispatch({
        type: apiActionTypes.API_FAILURE,
        payload: error
    })
    setTimeout(() => {
        dispatch({
            type: apiActionTypes.API_RESET,
        })
    }, 4000);
};


export const resetUser = () => ({
    type: userActionTypes.RESET,
});
