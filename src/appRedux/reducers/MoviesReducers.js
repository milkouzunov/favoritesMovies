import {
  GET_MOVIES_REQUEST,
  GET_MOVIES_SUCCESS,
  GET_MOVIE_REQUEST,
  GET_MOVIE_SUCCESS,
} from "../actionTypes";

const initialState = {
  movies: [],
  movieTitle: "",
  movieId: "",
  movie: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIES_SUCCESS:
      const { movies } = action;
      return {
        ...state,
        movies,
      };
    case GET_MOVIE_SUCCESS:
      const { movie } = action;
      return {
        ...state,
        movie,
      };
    default:
      return state;
  }
};
