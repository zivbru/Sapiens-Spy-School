import api from '../../utils/api';
import { START, STOP, INSERT_LOG, CLEAR_LOGS } from '../types';

//Start monitor
export const start = (path) => async (dispatch) => {
  const body = { path };
  try {
    console.log('start');
    await api.post('/watcher/start', body);
    dispatch({
      type: START,
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

export const clearLogs = () => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_LOGS,
    });
  } catch (err) {
    console.error('Login failed');
  }
};
