import mongodb = require('mongodb');
import { injectable } from "inversify";

import { ResponseResult } from "../../app/hotel/models/responseresults";
import { ResultCode } from "../../app/hotel/models/enum";

@injectable()
export class BaseRepository {
    
    protected collection: string;
    constructor(collection?: string) {
        this.collection = collection;
    }

    protected errorHandler(err: any) {
        console.error("An error accurred " + err.message || err);
    }

    protected createResultFromError(err: any): ResponseResult {
        console.error("An error accurred " + err.message || err);

        return new ResponseResult(ResultCode.Error, false, "An error accurred " + err.message || err);
    }

    protected createResultFromInsert(data: mongodb.InsertOneWriteOpResult, collection?: string): ResponseResult {
        return data.result.ok ? 
                new ResponseResult(ResultCode.Success, true, "insert data successfully.") : 
                new ResponseResult(ResultCode.Error, false, "error occurred insert data " + collection || this.collection);
    }

    protected createResultFromUpdate(data: mongodb.UpdateWriteOpResult, collection?: string): ResponseResult {
        return data.result.ok ? 
                new ResponseResult(ResultCode.Success, true, "update data successfully.") : 
                new ResponseResult(ResultCode.Error, false, "error occurred update data " + collection || this.collection);
    }

    protected createResultFromDelete(data: mongodb.DeleteWriteOpResultObject, collection?: string): ResponseResult {
        return data.result.ok ? 
                new ResponseResult(ResultCode.Success, true, "delete data successfully.") : 
                new ResponseResult(ResultCode.Error, false, "error occurred delete data " + collection || this.collection);
    }

    protected createResultFromSelect(data: any): ResponseResult {
        if (data === undefined || data === null)
            return new ResponseResult(ResultCode.Error, data, "cannot find any result.");
        
        return new ResponseResult(ResultCode.Success, data, "query data successfully.");
    }
    protected createResultFromFindAndUpdate(data: mongodb.FindAndModifyWriteOpResultObject, collection?: string): ResponseResult {
        if (data === undefined || data === null || !data.ok)
            return new ResponseResult(ResultCode.Error, null, "cannot find any result.");
        
        return new ResponseResult(ResultCode.Success, data.value, "query data successfully.");
    }
}