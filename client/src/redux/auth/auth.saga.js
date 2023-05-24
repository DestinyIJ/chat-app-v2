// saga.js
import { put, takeLatest, call, delay, all, take } from 'redux-saga/effects';
import authActionTypes from "./auth.types"
import { 
    registerSuccess, registerFailure,
    loginSuccess, loginFailure, 
    refreshTokenSuccess, refreshTokenFailure,
    forgotPasswordSuccess, forgotPasswordFailure,
    resetPasswordSuccess, resetPasswordFailure,
    logoutSuccess, logoutFailure,
    verifyRegisterSuccess, verifyRegisterFailure } from "./auth.action"
import { registerUser, authenticateUser, refreshTokenApi, forgotPasswordApi, resetPasswordApi, logoutApi, verifyRegisterOTP } from "../../api/auth.api"

function* register(action) {
    try {
      const userData = action.payload;
      const responseData = yield call(registerUser, userData);
      yield put(registerSuccess(responseData));
    } catch (error) {
      yield put(registerFailure(error.message));
    }
}

function* verifyRegister(action) {
    try {
      const { otp, email } = action.payload;
      const responseData = yield call(verifyRegisterOTP, { otp, email });
      yield put(verifyRegisterSuccess(responseData));
    } catch (error) {
      yield put(verifyRegisterFailure(error.message));
    }
}

function* login(action) {
  try {
    const credentials = action.payload;
    const responseData = yield call(authenticateUser, credentials);
    yield put(loginSuccess(responseData));
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}


function* refreshToken() {
    try {
      const token = yield call(refreshTokenApi);
      yield put(refreshTokenSuccess(token));
    } catch (error) {
      yield put(refreshTokenFailure(error.message));
      yield put(logout()); // Log out the user if token refresh fails
    }
}

function* forgotPassword(action) {
    try {
      const { email } = action.payload;
      const responseData = yield call(forgotPasswordApi, { email });
      yield put(forgotPasswordSuccess(responseData));
    } catch (error) {
      yield put(forgotPasswordFailure(error.message));
    }
}

function* resetPassword(action) {
    try {
      const resetData = action.payload;
      const responseData = yield call(resetPasswordApi, resetData);
      yield put(resetPasswordSuccess(responseData));
    } catch (error) {
      yield put(resetPasswordFailure(error.message));
    }
}

function* logout() {
    try {
        // yield call(logoutApi);
        yield put(logoutSuccess());
    } catch(error) {
        console.log(error)
        yield put(logoutFailure(error.message))
    }
}

function* watchRegister() {
    yield takeLatest(authActionTypes.REGISTER_REQUEST, register);
}

function* watchVerifyRegister() {
    yield takeLatest(authActionTypes.VERIFY_REGISTER_REQUEST, verifyRegister);
}

function* watchLogin() {
  yield takeLatest(authActionTypes.LOGIN_REQUEST, login);
}

function* watchRefreshToken() {
    while (true) {
      yield take(authActionTypes.REFRESH_TOKEN_REQUEST);
      yield delay(1000 * 60 * 30); // Delay between token refresh attempts
      yield call(refreshToken);
    }
}

function* watchForgotPassword() {
    yield takeLatest(authActionTypes.FORGOT_PASSWORD_REQUEST, forgotPassword);
}

function* watchResetPassword() {
    yield takeLatest(authActionTypes.RESET_PASSWORD_REQUEST, resetPassword);
}

function* watchLogout() {
    yield takeLatest(authActionTypes.LOGOUT_REQUEST, logout);
}





export default function* authSaga() {
    yield all([
        call(watchLogin), 
        call(watchRefreshToken), 
        call(watchRegister),
        call(watchVerifyRegister),
        call(watchForgotPassword),
        call(watchResetPassword),
        call(watchLogout)
    ]);
}
