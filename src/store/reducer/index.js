// reducers/index.js
import { combineReducers } from 'redux';

import authReducer from './authReducer'; 
import brandReducer from './brandReducer';
import concernPersonReducer from './concernpersonReducer';
import meetingReducer from './meetingReducer';
import fetchMeetingReducer from './fetchMeetingsByUserReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  brand : brandReducer,
  concernPerson : concernPersonReducer,
  meeting: meetingReducer,
  fetchMeeting: fetchMeetingReducer
  // Add other reducers here if needed
});

export default rootReducer;
