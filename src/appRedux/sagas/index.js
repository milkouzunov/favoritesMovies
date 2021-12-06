import { all } from "redux-saga/effects";

import AuthSaga from './AuthSaga';
import MoviesSaga from './MoviesSaga';
import RatingSaga from './RatingSaga';
import CommetsSaga from './CommetsSaga';
import FavoritesSaga from './FavoritesSaga';

export default function* rootSaga () {
    yield all([
        AuthSaga(),
        MoviesSaga(),
        FavoritesSaga(),
        CommetsSaga(),
        RatingSaga(),
    ])
}