import { call, put, fork,takeEvery, all } from "redux-saga/effects";
import { addCommentSuccess } from "../actions/CommentsActions";
import { addComment } from "../../services/reviewService";

import {
  ADD_COMMENT_REQUEST
} from "../actionTypes";

function addCommentRequestApi (comment) {
  return addComment(comment)
  .then(res => {return res.json()})
}


function* addCommentReq(action) {
    try {
        const response = yield call(addCommentRequestApi, action.comment);
        yield put(addCommentSuccess(response));
    } catch (error) {
        console.log(error);
    }
}

export function* addCommentGenerator() {
  yield takeEvery(ADD_COMMENT_REQUEST, addCommentReq)
}



export default function* rootSaga () {
  yield all([
      fork(addCommentGenerator),
  ])
}
