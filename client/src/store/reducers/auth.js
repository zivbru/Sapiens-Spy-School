import { LOGIN, LOGOUT, GOOGLE_LOGIN } from '../types';

const initialState = {
  token: localStorage.getItem('token'),
  user: null,
  isLoggedIn: false,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      // localStorage.setItem('user', action.user);
      return {
        ...state,
        user: action.user,
        isLoggedIn: true,
      };
    case GOOGLE_LOGIN:
      return {
        ...state,
        user: action.user,
        isLoggedIn: true,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default authReducer;
