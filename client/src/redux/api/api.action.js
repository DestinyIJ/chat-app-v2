import apiActionTypes from "./api.types";

export const apiRequest = () => ({
    type: apiActionTypes.API_REQUEST,
});

export const apiSuccess = (message) => ({
    type: apiActionTypes.API_SUCCESS,
    payload: message,
});

export const apiFailure = (message) => ({
    type: apiActionTypes.API_FAILURE,
    payload: message,
});

export const apiReset = () => ({
    type: apiActionTypes.API_RESET,
});
  