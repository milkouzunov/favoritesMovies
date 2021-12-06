import { call, put, fork, takeEvery, all } from "redux-saga/effects";
import {
  signupSuccess,
  signinSuccess,
  signinErrorSuccess,
} from "../actions/AuthActions";
import { signUp, signIn } from "../../services/authService";
import { SIGNUP_REQUEST, SIGNIN_REQUEST } from "../actionTypes";

function signupRequestApi({ username, password, rePassword }) {
  return signUp({ username, password, rePassword });
}

function signinRequestApi({ username, password }) {
  return signIn({ username, password });
}

function* signup(action) {
  try {
    console.log(action);
    const response = yield call(signupRequestApi, action.userData);
    yield put(signupSuccess(response));
  } catch (error) {
    console.log(error);
  }
}

function* signin(action) {
  try {
    const response = yield call(signinRequestApi, action.userData);
    yield put(signinSuccess(response));
  } catch (error) {
    yield put(signinErrorSuccess(error.toString()));
    console.log(error);
  }
}

export function* signupGenerator() {
  yield takeEvery(SIGNUP_REQUEST, signup);
}
function* signinGenerator() {
  yield takeEvery(SIGNIN_REQUEST, signin);
}

export default function* rootSaga() {
  yield all([fork(signupGenerator), fork(signinGenerator)]);
}
