import userActionTypes from "./user.types";

const INITIAL_STATE = {
    friends: [],
    friendRequests: [],
    users: [],
    user: null
}


const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userActionTypes.GET_FRIEND_REQUESTS_SUCCESS:
            return {
                ...state,
                friendRequests: action.payload
            }
        case userActionTypes.GET_FRIENDS_SUCCESS:
            return {
                ...state,
                friends: action.payload
            }
        case userActionTypes.SEARCH_USERS_SUCCESS:
        case userActionTypes.GET_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload
            }
        case userActionTypes.GET_USER_SUCCESS:
            return {
                ...state,
                user: action.payload
            }
        case userActionTypes.RESET:
            return {
                ...INITIAL_STATE,
            }
        default:
            return state;
    }
}

export default userReducer
