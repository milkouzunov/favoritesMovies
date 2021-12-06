import { 
    ADD_RATING_REQUEST,
    ADD_RATING_SUCCESS,
} from "../actionTypes";

export const addRatingRequest = (rating) => ({
  type: ADD_RATING_REQUEST,
  rating,
});
export const addRatingSuccess = (res) => ({
  type: ADD_RATING_SUCCESS,
  res,
});