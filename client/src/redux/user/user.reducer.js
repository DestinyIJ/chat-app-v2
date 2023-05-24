import userActionTypes from "./user.types";

const INITIAL_STATE = {
    friends: [],
    friendRequest: [],
    users: []
}


const appReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userActionTypes:
            return {
                ...INITIAL_STATE,
            }
        default:
            return state;
    }
}

export default appReducer
