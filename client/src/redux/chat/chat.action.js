import chatActionTypes from "./chat.types";

export const setConversation = (data) => ({
    type: chatActionTypes.SET_CONVERSATION,
    payload: data
})