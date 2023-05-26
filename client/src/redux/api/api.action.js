import apiActionTypes from "./api.types";

export const apiRequest = () => ({
    type: apiActionTypes.API_REQUEST,
});

export const apiSuccess = (message) => (dispatch) => {
    dispatch({
        type: apiActionTypes.API_SUCCESS,
        payload: message,
    })
    setTimeout(() => {
        dispatch({
            type: apiActionTypes.API_RESET,
        })
    }, 4000);
};


export const apiFailure = (message) => (dispatch) => {
    dispatch({
        type: apiActionTypes.API_FAILURE,
        payload: message,
    })
    setTimeout(() => {
        dispatch({
            type: apiActionTypes.API_RESET,
        })
    }, 4000);
};

export const apiReset = () => ({
    type: apiActionTypes.API_RESET,
});
  