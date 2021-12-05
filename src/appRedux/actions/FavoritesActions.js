import {
  GET_FAVORITES_REQUEST,
  GET_FAVORITES_SUCCESS,
  ADD_FAVORITES_REQUEST,
  ADD_FAVORITES_SUCCESS,
  REMOVE_FAVORITES_REQUEST,
  REMOVE_FAVORITES_SUCCESS,
} from "../actionTypes";

export const getFavoritesRequest = () => ({
  type: GET_FAVORITES_REQUEST,
});

export const getFavoritesSuccess = (favorites) => ({
  type: GET_FAVORITES_SUCCESS,
  favorites,
});

export const addFavoritesRequest = (movie) => ({
  type: ADD_FAVORITES_REQUEST,
  movie,
});

export const addFavoritesSuccess = (response) => ({
  type: ADD_FAVORITES_SUCCESS,
  response,
});

export const removeFavoritesRequest = (movieId) => ({
  type: REMOVE_FAVORITES_REQUEST,
  movieId,
});

export const removeFavoritesSuccess = (response) => ({
  type: REMOVE_FAVORITES_SUCCESS,
  response,
});
