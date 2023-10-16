import {
    CREATE_MEETING_SUCCESS,
    CREATE_MEETING_FAILURE,
    GET_MEETINGS_SUCCESS,
    GET_MEETINGS_FAILURE,
    GET_MEETING_SUCCESS,
    GET_MEETING_FAILURE
} from "../actions/actionTypes";

const initialState = {
    meetings: [],
    meeting: null,
    loading: false,
    error: null,
};

const meetingReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_MEETING_SUCCESS:
            console.log(action.payload, "action console")
            return {
                ...state,
                meetings: [...state.meetings, action.payload],
                loading: false,
            };
        case CREATE_MEETING_FAILURE:
            console.log(action.payload, "failuer console in reducer")
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case GET_MEETINGS_SUCCESS:
            return {
                ...state,
                meetings: action.payload,
                loading: false,
            };
        case GET_MEETINGS_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case GET_MEETING_SUCCESS:
            return {
                ...state,
                meeting: action.payload,
                loading: false
            };
        case GET_MEETING_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        default:
            state;
    };
};


export default meetingReducer;