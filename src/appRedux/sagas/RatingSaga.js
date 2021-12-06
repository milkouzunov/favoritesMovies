import { call, put, fork,takeEvery, all } from "redux-saga/effects";
import { addRatingSuccess } from "../actions/RatingActions";
import { addRatings } from "../../services/reviewService";

import {
  ADD_RATING_REQUEST
} from "../actionTypes";

function addRatingRequestApi (comment) {
  return addRatings(comment)
  .then(res => {return res.json()})
}


function* addRatingReq(action) {
    try {
        const response = yield call(addRatingRequestApi, action.rating);
        yield put(addRatingSuccess(response));
    } catch (error) {
        console.log(error);
    }
}

export function* addRatingGenerator() {
  yield takeEvery(ADD_RATING_REQUEST, addRatingReq)
}



export default function* rootSaga () {
  yield all([
      fork(addRatingGenerator),
  ])
}
