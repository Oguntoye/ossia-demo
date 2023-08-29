import moment from "moment";

const intl = require('intl');


export const isValidText = (text) => {   
    try {
        if(text == null || text == undefined || text ==""){
            return false;
        }
        text = text.toString();
        if (text.replace(/\s/g, "").length == 0) {
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }  
}


export const isValidEmail = (text) => {
    try {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var valid = true;
        if (re.test(text) == false) {
            valid = false;
        }
        return valid;
    } catch (error) {
        return false;
    }
  
}


export const isValidObject = (text) => {   
    try {
        if(text == null || text == undefined || text ==""){
            return false;
        }
        if (typeof text === 'object' && !Array.isArray(text) && text !== null) {
            return true;
        }
        else{
            return false;
        }
    } catch (error) {
        return false;
    }
   
}


export const IsJsonString = (str) => {
    if (str == null || str == "" || str == undefined) {
        return false;
    }
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};


export const isValidNumber = (text) => {
    try {
        if(isValidText(text)==false){
            return false;
        }
        text = text.toString();
        if (isNaN(Number(text) - 0)){
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }
   
}


export const getToShortC = (amount) =>{
    try {
        if(isValidText(amount)==false || amount == "0"){
            return "₵0.00";
        }
        else{
            amount = amount.toString()
            let currencyFormat = intl.NumberFormat("en-US", {
                style: "currency",
                currency: "GHS",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
            let currencyval = currencyFormat.format(amount);
            currencyval = currencyval.substring(3);
            return "₵" + currencyval;
        }
    } catch (error) {
        return "₵0.00";
    }
}


export const ToSentenceCase = (str) => {
    try {
        if(isValidText(str)==false){
            return "";
        }
        return str.replace(
            /\w\S*/g,
            function(txt) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    } catch (error) {
        return "";
    }
}


export const isAfter = (firstdate, seconddate) => {
    var firstdate = moment(firstdate,"YYYY-MM-DD");
    var seconddate = moment(seconddate,"YYYY-MM-DD");

    if(moment(firstdate).isAfter(seconddate)){
        return true;
    }
    else{
        return false;
    }
    
}



export const dactualtext = (text) =>{
    if(isValidText(text) == true){
        return text
    }
    else{
        return ""
    }
}


export const base64tourl = (data) => {
    try {
        const base64WithoutPrefix = data.substr('data:application/pdf;base64,'.length);
        const bytes = atob(base64WithoutPrefix);
        let length = bytes.length;
        let out = new Uint8Array(length);
        while (length--) {
            out[length] = bytes.charCodeAt(length);
        }
        let blobdata = new Blob([out], { type: 'application/pdf' });
        return URL.createObjectURL(blobdata);
    } catch (error) {
        return ""
    }
   
};


export const toDataUrl = (url, callback) => {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

export const resolveimageconversion = (imgurl) =>{
    return new Promise(async(resolve, reject) => {
        toDataUrl(`https://cors-anywhere.herokuapp.com/${imgurl}`, (base64data)=>{
            resolve({
                base64data : base64data,
            });
        })

    });
}


export const arraydatatoextract = (arr, propertiesToKeep) =>{
    arr = arr.map(item => propertiesToKeep.reduce((acc, prop) => (acc[prop] = item[prop], acc), {}));
    return arr;
}