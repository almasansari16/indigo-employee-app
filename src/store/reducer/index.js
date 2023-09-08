// reducers/index.js
import { combineReducers } from 'redux';

import authReducer from './authReducer'; // The new auth reducer

const rootReducer = combineReducers({
  authReducer,
  // Add other reducers here if needed
});

export default rootReducer;
