import CryptoJS = require("crypto-js");

let SystemConfig = {
    apiHost : "http://localhost:8080/api",
    keyToken: CryptoJS.MD5("hms_token"),
    keyUserLogin: CryptoJS.MD5("hms_userlogin"),
    keyEnscrypt: "hms1235",
    isAjaxProcessing: "ajax_processing"
}

export default SystemConfig;