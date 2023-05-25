// saga.js
import { put, takeLatest, call, delay, all, take } from 'redux-saga/effects';
import userActionTypes from "./user.types"
import { 
  getFriendRequestsSuccess, getFriendRequestsFailure,
  getFriendsSuccess, getFriendsFailure,
  getUsersSuccess, getUsersFailure,
  getUserSuccess, getUserFailure,
  searchUsersSuccess, searchUsersFailure
    } from "./user.action"
import { 
  getFriendRequests,
  getFriends,
  getUsers,
  getUser,
  searchUsers
 } from "../../api/user.api"

function* getFriendRequests() {
    try {
      const responseData = yield call(getFriendRequests);
      yield put(getFriendRequestsSuccess(responseData));
    } catch (error) {
      yield put(getFriendRequestsFailure(error.message));
    }
}


function* watchGetFriendRequests() {
    yield takeLatest(userActionTypes.GET_FRIEND_REQUESTS_REQUEST, getFriendRequests);
}

function* getFriends() {
  try {
    const responseData = yield call(getFriends);
    yield put(getFriendsSuccess(responseData));
  } catch (error) {
    yield put(getFriendsFailure(error.message));
  }
}


function* watchGetFriends() {
  yield takeLatest(userActionTypes.GET_FRIENDS_REQUEST, getFriends);
}


function* getUsers() {
  try {
    const responseData = yield call(getUsers);
    yield put(getUsersSuccess(responseData));
  } catch (error) {
    yield put(getUsersFailure(error.message));
  }
}


function* watchGetUsers() {
  yield takeLatest(userActionTypes.GET_USERS_REQUEST, getUsers);
}

function* getUser(action) {
  try {
    const userId = action.payload;
    const responseData = yield call(getUser, userId);
    yield put(getUserSuccess(responseData));
  } catch (error) {
    yield put(getUserFailure(error.message));
  }
}


function* watchGetUser() {
  yield takeLatest(userActionTypes.GET_USER_REQUEST, getUser);
}

function* searchUsers(action) {
  try {
    const searchParams = action.payload;
    const responseData = yield call(searchUsers, searchParams);
    yield put(searchUsersSuccess(responseData));
  } catch (error) {
    yield put(searchUsersFailure(error.message));
  }
}


function* watchSearchUsers() {
  yield takeLatest(userActionTypes.SEARCH_USERS_REQUEST, searchUsers);
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
