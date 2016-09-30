import CryptoJS = require("crypto-js");

let SystemConfig = {
    apiHost : "http://localhost:8080/api",
    keyUserLogin: CryptoJS.MD5("hms_userlogin"),
    keyEnscrypt: "hms1235"
}

export default SystemConfig;