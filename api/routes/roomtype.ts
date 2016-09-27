import express = require("express");
import mongodb = require('mongodb');

import kernel from "../ioc/ioc.config";
import { RoomtypeService } from "../services/roomtype.service";
import { Roomtype } from "../../app/hotel/models/roomtype";
import { ResponseResult } from "../../app/hotel/models/responseresults";
import { ResultCode, Status } from "../../app/hotel/models/enum";

var router = express.Router();

router.get("/test", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let roomtypeService = kernel.get<RoomtypeService>(RoomtypeService);
    roomtypeService.test();
    return res.json({ result: "test function." })
});

router.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let roomtypeService = kernel.get<RoomtypeService>(RoomtypeService);
    roomtypeService.getRoomtype()
        .then((data) => {
            var result = new ResponseResult(ResultCode.Success, data, "");
            res.json(result);
        })
        .catch((err) => {
            console.log("error occurred get data roomtype " + err);
            var result = new ResponseResult(ResultCode.Error, null, "error occurred get data roomtype " + err);
            res.json(result);
        });
});

router.post("/add", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let roomtype = req.body as Roomtype;
    let roomtypeService = kernel.get<RoomtypeService>(RoomtypeService);

    roomtypeService.addNewRoomtype(roomtype)
        .then((data) => {
            var result = data.result.ok ? new ResponseResult(ResultCode.Success, true, "") : new ResponseResult(ResultCode.Error, false, "error occurred insert data roomtype");
            res.json(result);
        })
        .catch((err) => {
            console.log("error occurred insert data roomtype" + err);
            var result = new ResponseResult(ResultCode.Error, false, "error occurred insert data roomtype " + err);
            res.json(result);
        });
});

router.post("/update", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let roomtypeService = kernel.get<RoomtypeService>(RoomtypeService);
    let roomtype = req.body as Roomtype;
    roomtypeService.updateRoomtype(roomtype)
        .then((data) => {
            var result = data.result.ok ? new ResponseResult(ResultCode.Success, true, "") : new ResponseResult(ResultCode.Error, false, "error occurred update data roomtype");
            res.json(result);
        })
        .catch((err) => {
            console.log("error occurred update data roomtype" + err);
            var result = new ResponseResult(ResultCode.Error, false, "error occurred update data roomtype " + err);
            res.json(result);
        });
});

router.get("/delete/:id", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let roomtypeService = kernel.get<RoomtypeService>(RoomtypeService);
    let id = req.params.id as string;
    let status = Status.Inactive;

    roomtypeService.updateStatus(id, status)
        .then((data) => {
            var result = data.result.ok ? new ResponseResult(ResultCode.Success, true, "") : new ResponseResult(ResultCode.Error, false, "error occurred delete data roomtype");
            res.json(result);
        })
        .catch((err) => {
            console.log("error occurred delete data roomtype" + err);
            var result = new ResponseResult(ResultCode.Error, false, "error occurred delete data roomtype " + err);
            res.json(result);
        });
});

export var roomtype = router;