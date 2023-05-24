import authActionTypes from "./auth.types"
import apiActionTypes from "../api/api.types";
import { useNavigate } from 'react-router-dom';


// register actions
export const registerRequest = (userData) => (dispatch) => {
    dispatch({
        type: authActionTypes.REGISTER_REQUEST,
        payload: userData,
    })

    dispatch({
        type: apiActionTypes.API_REQUEST,
    })

    setTimeout(() => {
        dispatch({
            type: apiActionTypes.API_RESET,
        })
    }, 4000);
};

export const registerSuccess = (data) => (dispatch) => {
    const navigate = useNavigate()
    dispatch({
        type: authActionTypes.REGISTER_SUCCESS,
        payload: data.user,
    })
    dispatch({
        type: apiActionTypes.API_SUCCESS,
        payload: data.message,
    })
    setTimeout(() => {
        dispatch({
            type: apiActionTypes.API_RESET,
        })
    }, 4000);
    navigate('/auth/register/verify');
};

export const registerFailure = (error) => (dispatch) => {
    dispatch({
        type: authActionTypes.REGISTER_FAILURE,
        payload: error,
    })
    dispatch({
        type: apiActionTypes.API_FAILURE,
        payload: error
    })
    setTimeout(() => {
        dispatch({
            type: apiActionTypes.API_RESET,
        })
    }, 4000);
};

// register actions
export const verifyRegisterRequest = (data) => (dispatch) => {
    dispatch({
        type: authActionTypes.VERIFY_REGISTER_REQUEST,
        payload: data,
    })

    dispatch({
        type: apiActionTypes.API_REQUEST,
    })

    setTimeout(() => {
        dispatch({
            type: apiActionTypes.API_RESET,
        })
    }, 4000);
};
  
export const verifyRegisterSuccess = (data) => (dispatch) => {
    dispatch({
        type: authActionTypes.VERIFY_REGISTER_SUCCESS,
        payload: data.user,
    })
    dispatch({
        type: apiActionTypes.API_SUCCESS,
        payload: data.message
    })
    setTimeout(() => {
        dispatch({
            type: apiActionTypes.API_RESET,
        })
    }, 4000);
};
  
export const verifyRegisterFailure = (error) => (dispatch) => {
    dispatch({
        type: authActionTypes.VERIFY_REGISTER_FAILURE,
    })
    dispatch({
        type: apiActionTypes.API_FAILURE,
        payload: error
    })
    setTimeout(() => {
        dispatch({
            type: apiActionTypes.API_RESET,
        })
    }, 4000);
};

// login actions
export const loginRequest = (credentials) => (dispatch) => {
    dispatch({
        type: authActionTypes.LOGIN_REQUEST,
        payload: credentials,
    })

    dispatch({
        type: apiActionTypes.API_REQUEST,
    })
    setTimeout(() => {
        dispatch({
            type: apiActionTypes.API_RESET,
        })
    }, 4000);
};

export const loginSuccess = (data) => (dispatch) => {
    dispatch({
        type: authActionTypes.LOGIN_SUCCESS,
        payload: data.user,
    })
    dispatch({
        type: apiActionTypes.API_SUCCESS,
        payload: data.message
    })
    setTimeout(() => {
        dispatch({
            type: apiActionTypes.API_RESET,
        })
    }, 4000);
};

export const loginFailure = (error) => (dispatch) => {
    dispatch({
        type: authActionTypes.LOGIN_FAILURE,
        payload: error
    })
    dispatch({
        type: apiActionTypes.API_FAILURE,
        payload: "Invalid login credentials"
    })
    setTimeout(() => {
        dispatch({
            type: apiActionTypes.API_RESET,
        })
    }, 4000);
};

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
export const forgotPasswordRequest = (email) => (dispatch) => {
    dispatch({
        type: authActionTypes.FORGOT_PASSWORD_REQUEST,
        payload: email,
    })

    dispatch({
        type: apiActionTypes.API_REQUEST,
    })

    setTimeout(() => {
        dispatch({
            type: apiActionTypes.API_RESET,
        })
    }, 4000);
}
  
export const forgotPasswordSuccess = (data) => (dispatch) => {
    dispatch({
        type: authActionTypes.FORGOT_PASSWORD_SUCCESS,
    })
    dispatch({
        type: apiActionTypes.API_SUCCESS,
        payload: data.message
    })
    setTimeout(() => {
        dispatch({
            type: apiActionTypes.API_RESET,
        })
    }, 4000);
};
  
export const forgotPasswordFailure = (error) => (dispatch) => {
    dispatch({
        type: authActionTypes.FORGOT_PASSWORD_FAILURE,
        payload: error,
    })
    dispatch({
        type: apiActionTypes.API_FAILURE,
        payload: error
    })
    setTimeout(() => {
        dispatch({
            type: apiActionTypes.API_RESET,
        })
    }, 4000);
};

// reset password actions
export const resetPasswordRequest = (resetData) => (dispatch) => {
    dispatch({
        type: authActionTypes.RESET_PASSWORD_REQUEST,
        payload: resetData,
    })

    dispatch({
        type: apiActionTypes.API_REQUEST,
    })
    setTimeout(() => {
        dispatch({
            type: apiActionTypes.API_RESET,
        })
    }, 4000);
};
  
export const resetPasswordSuccess = (data) => (dispatch) => {
    dispatch({
        type: authActionTypes.RESET_PASSWORD_SUCCESS,
        payload: data.user,
    })
    dispatch({
        type: apiActionTypes.API_SUCCESS,
        payload: data.message
    })
    setTimeout(() => {
        dispatch({
            type: apiActionTypes.API_RESET,
        })
    }, 4000);
};
  
export const resetPasswordFailure = (error) => (dispatch) => {
    dispatch({
        type: authActionTypes.RESET_PASSWORD_FAILURE,
        payload: error,
    })
    dispatch({
        type: apiActionTypes.API_FAILURE,
        payload: error
    })
    setTimeout(() => {
        dispatch({
            type: apiActionTypes.API_RESET,
        })
    }, 4000);
};

// logout action
export const logoutRequest = () => ({
    type: authActionTypes.LOGOUT_REQUEST,
})
export const logoutSuccess = () => ({
    type: authActionTypes.LOGOUT_SUCCESS,
});
export const logoutFailure = () => ({
    type: apiActionTypes.API_FAILURE,
})
