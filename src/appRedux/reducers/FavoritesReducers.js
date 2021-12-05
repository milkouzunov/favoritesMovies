import {
  GET_FAVORITES_REQUEST,
  GET_FAVORITES_SUCCESS,
  ADD_FAVORITES_REQUEST,
  ADD_FAVORITES_SUCCESS,
  REMOVE_FAVORITES_REQUEST,
  REMOVE_FAVORITES_SUCCESS,
} from "../actionTypes";

const initialState = {
  favorites: [],
  errors: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FAVORITES_SUCCESS: 
      const { favorites } = action;
      return {
        ...state,
        favorites,
      }
    default: return state;
  }
};
