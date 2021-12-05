import { call, put, fork,takeEvery, all } from "redux-saga/effects";
import { getMoviesSuccess, getMovieSuccess } from "../actions/MoviesActions";
import { get, getById } from "../../services/movieService";

import {
  GET_MOVIES_REQUEST,
  GET_MOVIE_REQUEST,
} from "../actionTypes";

function getMoviesRequestApi (movieTitle) {
  return get(movieTitle)
  .then(res => {return res.json()})
}

function getMovieRequestApi (movieId) {
  return getById(movieId)
  .then(res => {return res.json()})
}

function* getMovies(action) {
  try {
    const response = yield call(getMoviesRequestApi, action.movieTitle);
    yield put(getMoviesSuccess(response));
  } catch (error) {
    console.log(error);
  }
}

function* getMovie(action) {
    try {
        const response = yield call(getMovieRequestApi, action.movieId);
        yield put(getMovieSuccess(response))
    } catch (error) {
        console.log(error);
    }
}

export function* getMoviesGenerator() {
  yield takeEvery(GET_MOVIES_REQUEST, getMovies)
}
function* getMovieGenerator() {
  yield takeEvery(GET_MOVIE_REQUEST, getMovie)
}


export default function* rootSaga () {
  yield all([
      fork(getMoviesGenerator),
      fork(getMovieGenerator)
  ])
}
