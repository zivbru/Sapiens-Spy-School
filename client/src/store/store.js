import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './reducers/auth';
import logReducer from './reducers/logs';

const rootReducer = combineReducers({
  auth: authReducer,
  logs: logReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
