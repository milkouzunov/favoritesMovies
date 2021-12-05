import { call, put, fork, takeEvery, all } from "redux-saga/effects";
import {
  addFavoritesSuccess,
  getFavoritesSuccess,
  removeFavoritesSuccess,
} from "../actions/FavoritesActions";

import { get, add, remove } from "../../services/favoriteService";

import { ADD_FAVORITES_REQUEST, GET_FAVORITES_REQUEST, REMOVE_FAVORITES_REQUEST } from "../actionTypes";

function getFavoritesRequestApi() {
  return get().then((res) => {
    return res.json();
  });
}

function addFavoriteRequestApi(movie) {
  return add(movie).then((res) => {
    return res.json();
  });
}

function removeFavoriteRequestApi(movieId) {
  return remove(movieId).then((res) => {
      return res.json();
  });
}

function* getFavorites() {
  try {
    const response = yield call(getFavoritesRequestApi);
    yield put(getFavoritesSuccess(response));
  } catch (error) {
    console.log(error);
  }
}

function* addFavorite(action) {
  try {
    const response = yield call(addFavoriteRequestApi(action.movie));
    yield put(addFavoritesSuccess(response));
  } catch (error) {
    console.log(error);
  }
}

function* removeFavorite(action) {
  try {
    const response = yield call(removeFavoriteRequestApi(action.movieId));
    yield put(removeFavoritesSuccess(response));
  } catch (error) {
    console.log(error);
  }
}

function* getFavoritesGenerator() {
    yield takeEvery(GET_FAVORITES_REQUEST, getFavorites);
}

function* addFavoriteGenerator() {
    yield takeEvery(ADD_FAVORITES_REQUEST, addFavorite);
}

function* removeFavoriteGenerator() {
    yield takeEvery(REMOVE_FAVORITES_REQUEST, removeFavorite)
}

export default function* rootSaga() {
    yield all([
        fork(getFavoritesGenerator),
        fork(addFavoriteGenerator),
        fork(removeFavoriteGenerator)
    ])
}