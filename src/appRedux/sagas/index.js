import { all } from "redux-saga/effects";

import AuthSaga from './AuthSaga';
import MoviesSaga from './MoviesSaga';
import FavoritesSaga from './FavoritesSaga';

export default function* rootSaga () {
    yield all([
        AuthSaga(),
        MoviesSaga(),
        FavoritesSaga(),
    ])
}