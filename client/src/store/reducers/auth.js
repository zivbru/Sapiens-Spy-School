import { LOGIN, LOGOUT } from '../types';

const initialState = {
  user: null,
  isLoggedIn: false,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
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
