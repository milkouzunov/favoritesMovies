import { 
    ADD_COMMENT_REQUEST, 
    ADD_COMMENT_SUCCESS,
    EDIT_COMMENT_REQUEST,
    EDIT_COMMENT_SUCCESS
} from "../actionTypes";

export const addCommentRequest = (comment) => ({
  type: ADD_COMMENT_REQUEST,
  comment,
});
export const addCommentSuccess = (res) => ({
  type: ADD_COMMENT_SUCCESS,
  res,
});

export const editCommentRequest = (id, comment) => ({
  type: EDIT_COMMENT_REQUEST,
  comment,
  id
});
export const editCommentSuccess = (res) => ({
  type: EDIT_COMMENT_SUCCESS,
  res,
});