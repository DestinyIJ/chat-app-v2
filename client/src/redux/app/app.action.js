import appActionTypes from "./app.types";

export const toggleSidebar = () => ({
    type: appActionTypes.TOGGLE_SIDEBAR
})

export const updateSidebarType = (sidebarType) => ({
    type: appActionTypes.UPDATE_SIDEBAR_TYPE,
    payload: sidebarType
})

// dialog actions
export const toggleDialog = (dialog) => ({
    type: appActionTypes.TOGGLE_DIALOG,
    payload: dialog
})