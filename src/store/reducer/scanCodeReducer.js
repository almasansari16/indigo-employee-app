import {
    CREATE_SCAN_CODE_SUCCESS,
    CREATE_SCAN_CODE_FAILURE,
    GET_SCAN_CODES_SUCCESS,
    GET_SCAN_CODES_FAILURE,
    GET_SCAN_CODE_SUCCESS,
    GET_SCAN_CODE_FAILURE
} from "../actions/actionTypes";


const initialState = {
    scanCodes: [],
    scanCode: null,
    loading: false,
    error: null,
};

const scanCodeReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_SCAN_CODE_SUCCESS:
            // console.log(action.payload, "action console")
            return {
                ...state,
                scanCodes: [...state.scanCodes, action.payload],
                loading: false,
            };

        case CREATE_SCAN_CODE_FAILURE:
            // console.log(action.payload, "failuer console in reducer")
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case GET_SCAN_CODES_SUCCESS:
            // console.log("get all scan code success", action.payload);
            return {
                ...state,
                scanCodes: action.payload,
                loading: false
            }
        case GET_SCAN_CODES_FAILURE:
            // console.log("get all scan code failuer", action.payload);
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case GET_SCAN_CODE_SUCCESS:
            // console.log("get single scan code success", action.payload);
            return {
                ...state,
                scanCode: action.payload,
                loading: false
            }
        case GET_SCAN_CODE_FAILURE:
            // console.log("get single scan code failuer", action.payload);
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state;
    }
}


export default scanCodeReducer;