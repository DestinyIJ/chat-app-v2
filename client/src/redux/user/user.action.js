import userActionTypes from "./user.types";
import apiActionTypes from "../api/api.types";

export const getFriendRequests = (userData) => (dispatch) => {
    dispatch({
        type: userActionTypes.GET_FRIEND_REQUESTS,
        payload: userData,
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
