import { createSelector } from "reselect";

export const selectUser = state => state.user

export const selectUsers = createSelector(
    [selectUser],
    (user) => user.users
)

export const selectFriends = createSelector(
    [selectUser],
    (user) => user.friends
)

export const selectFriendRequests = createSelector(
    [selectUser],
    (user) => user.friendRequests
)
