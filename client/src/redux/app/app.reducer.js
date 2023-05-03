import appActionTypes from "./app.types";

const INITIAL_STATE = {
    sidebar: {
        open: false,
        type: "CONTACT"
    }
}


const appReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case appActionTypes.TOGGLE_SIDEBAR:
            return {
                ...state,
                sidebar: {
                    ...state.sidebar,
                    open: !state.sidebar.open
                }
            }
        case appActionTypes.UPDATE_SIDEBAR_TYPE:
            return {
                ...state,
                sidebar: {
                    ...state.sidebar,
                    type: action.payload
                }
            }
        default:
            return state;
    }
}

export default appReducer
