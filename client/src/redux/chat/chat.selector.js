import { createSelector } from "reselect";

export const selectChat = state => state.chat

export const selectParticipants = createSelector(
    [selectChat],
    (chat) => chat.participants
)

export const selectMessages = createSelector(
    [selectChat],
    (chat) => chat.messages
)