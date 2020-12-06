import api from '../../utils/api';
import { LOGIN, LOGOUT } from '../types';

//Login user
export const login = (email, password) => async (dispatch) => {
  const body = { email, password };

  try {
    if (email && password) {
      const user = await api.post('/auth/login', body);
      if (user.data) {
        localStorage.setItem('user', JSON.stringify(user.data));

        dispatch({
          type: LOGIN,
          payload: user.data,
        });
      } else {
        throw new Error('Invalid');
      }
    }
  } catch (err) {
    console.error('Login failed');
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem('user');
    dispatch({
      type: LOGOUT,
    });
  } catch (err) {
    console.error('Login failed');
  }
};
