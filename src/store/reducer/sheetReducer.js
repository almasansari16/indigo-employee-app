import { FETCH_SHEET_DATA_FAILURE, FETCH_SHEET_DATA_SUCCESS } from '../actions/actionTypes';


const initialState = {
    allData: [],
    data: null,
    loading: false,
    error: null,
};


const sheetReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SHEET_DATA_SUCCESS:
            // console.log(action.payload , "console in reducer")
            return {
                ...state,
                allData: action.payload,
                loading: false,
            };
            case FETCH_SHEET_DATA_FAILURE:
                return {
                    ...state,
                    error: action.payload,
                    loading: false,
                };
        default:
           return state;
    }
}

export default sheetReducer;
