import authActionTypes from "./auth.types"

const INITIAL_STATE = {
    currentUser: null,
    registerUser: null,
    accessToken: null,
}


const appReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case authActionTypes.REGISTER_SUCCESS:
            return {
                ...INITIAL_STATE,
                registerUser: action.payload,
            }
        case authActionTypes.VERIFY_REGISTER_SUCCESS:
        case authActionTypes.LOGIN_SUCCESS:
            return {
                ...INITIAL_STATE,
                currentUser: action.payload.user,
                accessToken: action.payload.accessToken,
            }
        case authActionTypes.REFRESH_TOKEN_SUCCESS:
            return {
                ...INITIAL_STATE,
                accessToken: action.payload,
            }
        case authActionTypes.LOGOUT_SUCCESS:
            return {
                ...INITIAL_STATE
            }
        default:
            return state;
    }
}

export default appReducer
