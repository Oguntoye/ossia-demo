import { isValidText } from '../utils/helpers';
import { Navigate } from "react-router-dom";

export const BASE_URL = 'https://api.ossiaportal.com/api/';
// export const BASE_URL = 'http://ossiaapi.flexibank.net/api/';
// export const BASE_URL = 'http://localhost:8000/api/';


export const getapicallhelper = async(endpoint, data)=>{
    return new Promise(async(resolve, reject) => {
        try {
            
            const options = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization" : "Basic RTc1RDBFREQtMzRDOS00NzQ4LUEwMkQtOTUxNDVBMzBBM0ZBOkI5MDQwM0NCLUZGNTktNEI1NC1CMkJGLTJGM0JFQzhDRTQzNQ==",
                    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36",
                    "sessionID": window.localStorage.getItem("sessionID")
                }
            };
    
            const fetchResult = await fetch(`${BASE_URL}${endpoint}`, options);
            const result = await fetchResult.json();

            console.log("result", result);

            if (fetchResult.ok) {
                if(result.status == 1){
                    if(isValidText(result.sessionID) == true){
                        window.localStorage.setItem("sessionID", result.sessionID);
                    }
                    resolve({
                        success : true,
                        message : result.message,
                        data : result,
                    });
                } 
                else{
                    resolve({
                        success : false,
                        message : result.message,
                        data : {},
                    });
                }
            }
            else{
                resolve({
                    success: false,
                    message: result.message || 'Something went wrong',
                    data: result || '',
                });
            }
        } catch (error) {
            console.log("error",error);
            resolve({
                success: false,
                message: 'Sorry, Something went wrong!',
                data: ""
            });
            
        }  
    });
}

export const postapicallhelper = async(endpoint, data)=>{
    return new Promise(async(resolve, reject) => {
        try {
            
            const options = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization" : "Basic RTc1RDBFREQtMzRDOS00NzQ4LUEwMkQtOTUxNDVBMzBBM0ZBOkI5MDQwM0NCLUZGNTktNEI1NC1CMkJGLTJGM0JFQzhDRTQzNQ==",
                    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36",
                    "sessionID": window.localStorage.getItem("sessionID")
                },
                body: JSON.stringify(data)
            };
    
            const fetchResult = await fetch(`${BASE_URL}${endpoint}`, options);
            const result = await fetchResult.json();

            console.log("result", result);

            if (fetchResult.ok) {
                if(result.status == 1){
                    if(isValidText(result.sessionID) == true){
                        window.localStorage.setItem("sessionID", result.sessionID);
                    }
                    resolve({
                        success : true,
                        message : result.message,
                        data : result,
                    });
                } 
                else{
                    resolve({
                        success : false,
                        message : result.message,
                        data : {},
                    });
                }
            }
            else{
                resolve({
                    success: false,
                    message: result.message || 'Something went wrong',
                    data: result || '',
                });
            }
        } catch (error) {
            console.log("error",error);
            resolve({
                success: false,
                message: 'Sorry, Something went wrong!',
                data: "",
            });
            return <Navigate to="/" />;
        }  
    });
}

