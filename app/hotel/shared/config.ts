import {md5} from "./md5";

let SystemConfig = {
    apiHost : "http://localhost:8080/api",
    keyUserId: md5("hms_id"),
    keyUserName: md5("hms_username"),
    keyFullName: md5("hms_fullname"),
    keyUrlImage: md5("hms_urlimage"),
    keyGroupUser: md5("hms_groupuser")
}

export default SystemConfig;