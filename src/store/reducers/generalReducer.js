import {SET_LOGIN_DATA, TIMER_TICK, UPDATE_TICK} from "../actions/actionTypes"

const initialState = {
    profileData : {},
    investmentData : [],
    bankLoanData: [],
    casaData:[],
    logouttimeremaining: 300,
};

const reducer = (state = initialState,  action) => {
    switch(action.type){
        case SET_LOGIN_DATA:
            // console.warn("dd", action.data);
            return{
                ...state,
                profileData: action.data.profileData,
                investmentData: action.data.investmentData,
                bankLoanData: action.data.bankLoanData,
                casaData: action.data.casaData,
            }
        case TIMER_TICK:
            return{
                ...state,
                logouttimeremaining: action.data
            }
        case UPDATE_TICK:
            return{
                ...state,
                logouttimeremaining: action.data
            }
        default:
            return state;
    }
    
}

export default reducer;