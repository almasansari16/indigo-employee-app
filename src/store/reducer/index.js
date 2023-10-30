// reducers/index.js
import { combineReducers } from 'redux';

import authReducer from './authReducer'; 
import brandReducer from './brandReducer';
import concernPersonReducer from './concernpersonReducer';
import meetingReducer from './meetingReducer';
import fetchMeetingReducer from './fetchMeetingsByUserReducer';
import sheetReducer from './sheetReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  brand : brandReducer,
  concernPerson : concernPersonReducer,
  meeting: meetingReducer,
  fetchMeeting: fetchMeetingReducer,
  sheet: sheetReducer
  // Add other reducers here if needed
});

export default rootReducer;
