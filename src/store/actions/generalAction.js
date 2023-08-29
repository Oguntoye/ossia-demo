import {SET_LOGIN_DATA} from "./actionTypes";

export const setLoginData = (data) => {
    return {
        type: SET_LOGIN_DATA,
        data: data
    };
}



