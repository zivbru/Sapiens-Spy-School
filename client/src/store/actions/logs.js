import api from '../../utils/api';
import { START, STOP, INSERT_LOG } from '../types';

//Start monitor
export const start = (path) => async (dispatch) => {
  const body = { path };
  try {
    console.log('start');
    const result = await api.post('/watcher/start', body);
    console.log('result', result);
    dispatch({
      type: START,
      payload: result.data,
    });
  } catch (err) {
    console.error('Login failed');
  }
};

export const stop = () => async (dispatch) => {
  try {
    console.log('stop');
    await api.post('/watcher/stop');
    dispatch({
      type: STOP,
    });
  } catch (err) {
    console.error('Login failed');
  }
};

export const insertLog = (log) => async (dispatch) => {
  try {
    dispatch({
      type: INSERT_LOG,
      payload: log.msg,
    });
  } catch (err) {
    console.error('Login failed');
  }
};
