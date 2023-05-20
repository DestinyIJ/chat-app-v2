// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = "/";

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    chat: path(ROOTS_DASHBOARD, "chat"),
  },
  auth : {
    login: path("/auth/", "login"),
    register: path("/auth/", "register")
  }
};
