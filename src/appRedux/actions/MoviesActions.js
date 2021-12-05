import {
  GET_MOVIES_REQUEST,
  GET_MOVIES_SUCCESS,
  GET_MOVIE_REQUEST,
  GET_MOVIE_SUCCESS,
} from "../actionTypes";

export const getMoviesRequest = (movieTitle) => ({
  type: GET_MOVIES_REQUEST,
  movieTitle,
});
export const getMoviesSuccess = (movies) => ({
  type: GET_MOVIES_SUCCESS,
  movies,
});
export const getMovieRequest = (movieId) => ({
  type: GET_MOVIE_REQUEST,
  movieId,
});
export const getMovieSuccess = (movie) => ({
  type: GET_MOVIE_SUCCESS,
  movie,
});
