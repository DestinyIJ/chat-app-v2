import authActionTypes from "./auth.types"

export const resetSuccess = () => ({
    type: authActionTypes.RESET_SUCCESS
});

// register actions
export const registerRequest = (userData) => ({
  type: authActionTypes.REGISTER_REQUEST,
  payload: userData,
});

export const registerSuccess = (user) => ({
  type: authActionTypes.REGISTER_SUCCESS,
  payload: user,
});

export const registerFailure = (error) => ({
  type: authActionTypes.REGISTER_FAILURE,
  payload: error,
});

// register actions
export const verifyRegisterRequest = (data) => ({
    type: authActionTypes.VERIFY_REGISTER_REQUEST,
    payload: data,
});
  
export const verifyRegisterSuccess = (user) => ({
    type: authActionTypes.VERIFY_REGISTER_SUCCESS,
    payload: user,
});
  
export const verifyRegisterFailure = (error) => ({
    type: authActionTypes.VERIFY_REGISTER_FAILURE,
    payload: error,
});

// login actions
export const loginRequest = (credentials) => ({
    type: authActionTypes.LOGIN_REQUEST,
    payload: credentials,
});

export const loginSuccess = (user) => ({
    type: authActionTypes.LOGIN_SUCCESS,
    payload: user,
});

export const loginFailure = (error) => ({
    type: authActionTypes.LOGIN_FAILURE,
    payload: error,
});

// refresh-token actions
export const refreshTokenRequest = () => ({
    type: authActionTypes.REFRESH_TOKEN_REQUEST,
  });
  
export const refreshTokenSuccess = (token) => ({
    type: authActionTypes.REFRESH_TOKEN_SUCCESS,
    payload: token,
});
  
export const refreshTokenFailure = (error) => ({
    type: authActionTypes.REFRESH_TOKEN_FAILURE,
    payload: error,
});


// forgot password actions
export const forgotPasswordRequest = (email) => ({
    type: authActionTypes.FORGOT_PASSWORD_REQUEST,
    payload: email,
});
  
  export const forgotPasswordSuccess = () => ({
    type: authActionTypes.FORGOT_PASSWORD_SUCCESS,
});
  
  export const forgotPasswordFailure = (error) => ({
    type: authActionTypes.FORGOT_PASSWORD_FAILURE,
    payload: error,
});

// reset password actions
export const resetPasswordRequest = (resetData) => ({
    type: authActionTypes.RESET_PASSWORD_REQUEST,
    payload: resetData,
});
  
export const resetPasswordSuccess = () => ({
    type: authActionTypes.RESET_PASSWORD_SUCCESS,
});
  
export const resetPasswordFailure = (error) => ({
    type: authActionTypes.RESET_PASSWORD_FAILURE,
    payload: error,
});

// logout action
export const logoutRequest = () => ({
    type: authActionTypes.LOGOUT_REQUEST,
})
export const logoutSuccess = () => ({
    type: authActionTypes.LOGOUT_SUCCESS,
});
export const logoutFailure = () => ({
    type: authActionTypes.LOGOUT_FAILURE,
})
