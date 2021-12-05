import {
  SIGNUP_SUCCESS,
  SIGNIN_SUCCESS,
  LOGOUT_SUCCESS
} from "../actionTypes";

const initialState = {
  user: localStorage.getItem('username') || null,
  error: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      if (action) {
          console.log(action);
          //<Redirect to="/sign-in"/>
      }     
    case SIGNIN_SUCCESS:
      return {
        ...state,
        user: action.userData,
      };
    case LOGOUT_SUCCESS: {
        return {
         ...state,
         user: null
        }
    }
    default:
      return state;
  }
};
