import authActionTypes from "./auth.types"

const INITIAL_STATE = {
    currentUser: null,
    registerUser: null,
    accessToken: null,
    loading: false,
    error: null,
    success: false,
}


const appReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case authActionTypes.REGISTER_REQUEST:
        case authActionTypes.VERIFY_REGISTER_REQUEST:
        case authActionTypes.LOGIN_REQUEST:
        case authActionTypes.FORGOT_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false
            }
        case authActionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                registerUser: action.payload,
                loading: false,
                error: null,
                success: true,
            }
        case authActionTypes.VERIFY_REGISTER_SUCCESS:
        case authActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                accessToken: action.payload.accessToken,
                registerUser: null,
                loading: false,
                error: null,
                success: true,
            }
        case authActionTypes.FORGOT_PASSWORD_SUCCESS:
        case authActionTypes.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                success: true,
            }
        case authActionTypes.REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
                accessToken: action.payload,
                loading: false,
                error: null,
                success: false,
            }
        case authActionTypes.REGISTER_FAILURE:
        case authActionTypes.VERIFY_REGISTER_FAILURE:
        case authActionTypes.LOGIN_FAILURE:
        case authActionTypes.FORGOT_PASSWORD_FAILURE:
        case authActionTypes.RESET_PASSWORD_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false,
            }
        case authActionTypes.LOGOUT_SUCCESS:
            return {
                ...INITIAL_STATE
            }
        case authActionTypes.RESET_SUCCESS:
            return {
                ...state,
                success: false
            }
        default:
            return state;
    }
}

export default appReducer
