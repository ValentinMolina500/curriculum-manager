import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects"

import * as types from "../store/actions"
import { setAuthStatus, authError, loginSuccess } from "../store/authSlice"
import { sessionsError, setSessionStatus, sessionsSuccess } from "../store/sessionsSlice"
import { instructorsError, setInstructorStatus, instructorsSuccess } from "../store/instructorsSlice"
import API from "../utils/API"
import { type } from "os"

function* login(action) {
  const { email, password } = action.payload.credentials;
  yield put(setAuthStatus("loading"))
  try {
    const result = yield call(API.login, { email, password });

    yield put(loginSuccess(result.user));

    const callback = action.payload.onLoginSuccess;
    if (callback) {
      callback();
    }


    /* Fetch user sessions */
    yield put({ type: types.FETCH_SESSIONS });
    yield put({ type: types.FETCH_INSTRUCTORS });
  } catch (error) {
    yield put(authError(error));
  }
}

function* watchLogin() {
  yield takeLatest(types.LOGIN_REQUEST, login)
}

function* fetchSessions(action) {
  yield put(setSessionStatus("loading"));

  try {
    const result = yield call(API.getSessions);

    yield put(sessionsSuccess(result));
  } catch (error) {
    yield put(sessionsError(error));
  }
}

function* watchFetchSessions() {
  yield takeLatest(types.FETCH_SESSIONS, fetchSessions);
}

function* fetchInstructors(action) {
  yield put(setInstructorStatus("loading"));

  try {
    const result = yield call(API.getInstructors);

    yield put(instructorsSuccess(result));
  } catch (error) {
    yield put(instructorsError(error));
  }
}

function* watchFetchInstructors() {
  yield takeLatest(types.FETCH_INSTRUCTORS, fetchInstructors);
}

export default function* rootSaga() {
  yield all([
    watchLogin(),
    watchFetchSessions(),
    watchFetchInstructors()
  ])
}
