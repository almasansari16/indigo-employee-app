// reducers/index.js
import { combineReducers } from 'redux';

import authReducer from './authReducer'; // The new auth reducer
import brandReducer from './brandReducer';
import concernPersonReducer from './concernpersonReducer';
import meetingReducer from './meetingReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  brand : brandReducer,
  concernPerson : concernPersonReducer,
  // meeting: meetingReducer
  // Add other reducers here if needed
});

export default rootReducer;
