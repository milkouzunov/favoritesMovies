import { 
    ADD_COMMENT_REQUEST, 
    ADD_COMMENT_SUCCESS,
} from "../actionTypes";

export const addCommentRequest = (comment) => ({
  type: ADD_COMMENT_REQUEST,
  comment,
});
export const addCommentSuccess = (res) => ({
  type: ADD_COMMENT_SUCCESS,
  res,
});
