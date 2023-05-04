import { createSelector } from "reselect";

const selectSidebar = store => store.app.sidebar

export const selectSidebarOpen = createSelector(
    [selectSidebar],
    (sidebar) => sidebar.open
)

export const selectSidebarType = createSelector(
    [selectSidebar],
    (sidebar) => sidebar.type
)

// dialog selectors
const selectDialog = store => store.app.dialog

export const selectAllDialog = createSelector(
    [selectDialog],
    (dialog) => dialog
)
export const selectThemeDialog = createSelector(
    [selectDialog],
    (dialog) => dialog.theme
)

export const selectShortcutDialog = createSelector(
    [selectDialog],
    (dialog) => dialog.shortcut
)