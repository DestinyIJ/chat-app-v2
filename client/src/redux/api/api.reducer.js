import apiActionTypes from "./api.types";

const INITIAL_STATE = {
    loading: false,
    error: false,
    success: false,
    message: null
}


const apiReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case apiActionTypes.API_REQUEST:
            return {
                ...INITIAL_STATE,
                loading: true
            }
        case apiActionTypes.API_SUCCESS:
            return {
                ...INITIAL_STATE,
                success: true,
                message: action.payload
            }
        case apiActionTypes.API_FAILURE:
            return {
                ...INITIAL_STATE,
                error: true,
                message: action.payload
            }
        case apiActionTypes.API_RESET:
            return {
                ...INITIAL_STATE,
            }
        default:
            return state;
    }
}

export default apiReducer
