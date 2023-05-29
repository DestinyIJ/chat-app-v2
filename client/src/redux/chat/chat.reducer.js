import chatActionTypes from "./chat.types"

const INITIAL_STATE = {
    private_chat : {
        id: null,
        messages: null,
        participants: null
    },
    group_chat : {
        id: null,
        messages: null,
        participants: null
    }

}


const chatReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case chatActionTypes.SET_CONVERSATION:
            return {
                ...state,
                private_chat : {
                    id: action.payload._id,
                    messages: action.payload.messages,
                    participants: action.payload.participants
                }
            }
        default:
            return state;
    }
}

export default chatReducer
