import { ADD_COMMENT_SUCCESS } from "../actionTypes";

const initialState = {
  resOk: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT_SUCCESS:
      const { res } = action;
      return {
        ...state,
        resOk: res,
      };
    default:
      return state;
  }
};
