import { INSERT_LOG, START, STOP } from '../types';

const initialState = {
  logs: [],
};
const logReducer = (state = initialState, action) => {
  switch (action.type) {
    case INSERT_LOG:
      return {
        ...state,
        logs: [...state.logs, action.payload],
      };
    case START:
      return {
        ...state,
        logs: [...state.logs, action.payload],
      };
    case STOP:
      return {
        ...state,
        logs: [],
      };
    default:
      return state;
  }
};

export default logReducer;
