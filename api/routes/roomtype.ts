import express = require("express");
import mongodb = require('mongodb');

import kernel from "../ioc/ioc.config";
import { RoomtypeService } from "../services/roomtype.service";
import { Roomtype } from "../../models/roomtype";
import { ResponseResult } from "../../models/responseresults";
import { ResultCode, Status } from "../../models/enum";

var router = express.Router();
let _roomtypeService = kernel.get<RoomtypeService>(RoomtypeService);

router.get("/test", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    _roomtypeService.test();
    return res.json({ result: "test function." })
});

router.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    _roomtypeService.getRoomtype(
        (roomtype) => {
            var result = new ResponseResult(ResultCode.Success, roomtype, "");
            res.json(result);
        }
    );
});

router.post("/add", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    var roomtype = req.body as Roomtype;
    _roomtypeService.addNewRoomtype(roomtype,
        (err) => {
            var result = err ? new ResponseResult(ResultCode.Error, false, err.message) : new ResponseResult(ResultCode.Success, true, "");
            res.json(result);
        });
});

router.post("/update", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    var roomtype = req.body as Roomtype;
    this._roomtypeService.updateRoomtype(roomtype,
        (err) => {
            var result = err ? new ResponseResult(ResultCode.Error, false, err.message) : new ResponseResult(ResultCode.Success, true, "");
            res.json(result);
        });
});

router.get("/delete/:id", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    var id = req.params.id as string;
    var status = Status.Active;
    this._roomtypeService.updateStatus(id, status,
        (err) => {
            var result = err ? new ResponseResult(ResultCode.Error, false, err.message) : new ResponseResult(ResultCode.Success, true, "");
            res.json(result);
        });
});

export var roomtype = router;