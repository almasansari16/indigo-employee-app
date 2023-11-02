// meetingReducer.js

import {
  FETCH_MEETINGS_REQUEST,
  FETCH_MEETINGS_SUCCESS,
  FETCH_MEETINGS_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  meetings: [],
  loading: false,
  error: null,
};

const fetchMeetingReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MEETINGS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_MEETINGS_SUCCESS:
      // console.log(action.payload , "reducer success")
      return { ...state, loading: false, meetings: action.payload, error: null };
    case FETCH_MEETINGS_FAILURE:
      console.log(action.error , "reducer failure")
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default fetchMeetingReducer;
