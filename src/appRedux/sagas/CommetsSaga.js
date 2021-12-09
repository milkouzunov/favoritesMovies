import { call, put, fork,takeEvery, all } from "redux-saga/effects";
import { addCommentSuccess, editCommentSuccess } from "../actions/CommentsActions";
import { addComment, editComment } from "../../services/reviewService";

import {
  ADD_COMMENT_REQUEST,
  EDIT_COMMENT_REQUEST
} from "../actionTypes";

function addCommentRequestApi (comment) {
  return addComment(comment);
}

function editCommentRequestApi (id, comment) {
  return editComment(id, comment);
}

function* addCommentReq(action) {
    try {
        const response = yield call(addCommentRequestApi, action.comment);
        yield put(addCommentSuccess(response));
    } catch (error) {
        console.log(error);
    }
}

function* editCommentReq(action) {
  try {
     console.log(action);
      const response = yield call(editCommentRequestApi, action.id, action.comment);
      yield put(editCommentSuccess(response));
  } catch (error) {
      console.log(error);
  }
}

export function* addCommentGenerator() {
  yield takeEvery(ADD_COMMENT_REQUEST, addCommentReq)
}

export function* editCommentGenerator() {
yield takeEvery(EDIT_COMMENT_REQUEST, editCommentReq)
}


export default function* rootSaga () {
  yield all([
      fork(addCommentGenerator),
      fork(editCommentGenerator)
  ])
}
