import api from '../../utils/api';
import { LOGIN, LOGOUT } from '../types';

//Login user
export const login = (email, password) => async (dispatch) => {
  const body = { email, password };

  try {
    const user = await api.post('/auth/login', body);
    if (user.data) {
      localStorage.setItem('user', JSON.stringify(user.data));
    }
    dispatch({
      type: LOGIN,
      payload: user.data,
    });
  } catch (err) {
    console.error('Login failed');
  }
};

//Login user with google
export const loginWithGoogle = (res) => async (dispatch) => {
  const user = res.profileObj;
  try {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    dispatch({
      type: LOGIN,
      payload: user.data,
    });
  } catch (err) {
    console.error('Login failed');
  }
};

export const logout = () => async (dispatch) => {
  console.log('logout');
  try {
    localStorage.removeItem('user');
    dispatch({
      type: LOGOUT,
    });
  } catch (err) {
    console.error('Login failed');
  }
};
