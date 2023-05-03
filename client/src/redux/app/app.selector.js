import { createSelector } from "reselect";

const selectSidebar = store => store.app.sidebar

export const selectSidebarOpen = createSelector(
    [selectSidebar],
    (sidebar) => sidebar.open
)