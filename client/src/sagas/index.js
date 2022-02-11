import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects"

import * as types from "../store/actions"
import { setAuthStatus, authError, loginSuccess } from "../store/authSlice"
import { semestersError, semestersSuccess, setSemesterStatus } from "../store/semestersSlice"
import { instructorsError, setInstructorStatus, instructorsSuccess } from "../store/instructorsSlice"
import API from "../utils/API"

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
    yield put({ type: types.FETCH_SEMESTERS });
    yield put({ type: types.FETCH_INSTRUCTORS });
  } catch (error) {
    yield put(authError(error));
  }
}

function* watchLogin() {
  yield takeLatest(types.LOGIN_REQUEST, login)
}

function* fetchSemesters(action) {
  yield put(setSemesterStatus("loading"));

  try {
    const result = yield call(API.getSemesters);

    yield put(semestersSuccess(result));
  } catch (error) {
    yield put(semestersError(error));
  }
}

function* watchFetchSemesters() {
  yield takeLatest(types.FETCH_SEMESTERS, fetchSemesters);
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
    watchFetchSemesters(),
    watchFetchInstructors()
  ])
}
