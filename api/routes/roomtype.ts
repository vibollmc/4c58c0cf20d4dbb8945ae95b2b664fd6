import express = require("express");

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
            res.json(data);
        })
        .catch((err) => {
            var result = new ResponseResult(ResultCode.Error, null, "error");
            res.json(result);
        });
});

router.post("/add", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let roomtype = req.body as Roomtype;
    let roomtypeService = kernel.get<RoomtypeService>(RoomtypeService);

    roomtypeService.addNewRoomtype(roomtype)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            var result = new ResponseResult(ResultCode.Error, null, "error");
            res.json(result);
        });
});

router.post("/update", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let roomtypeService = kernel.get<RoomtypeService>(RoomtypeService);
    let roomtype = req.body as Roomtype;
    roomtypeService.updateRoomtype(roomtype)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            var result = new ResponseResult(ResultCode.Error, null, "error");
            res.json(result);
        });
});

router.get("/delete/:id", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let roomtypeService = kernel.get<RoomtypeService>(RoomtypeService);
    let id = req.params.id as string;
    let status = Status.Inactive;

    roomtypeService.deleteRoomtype(id)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            var result = new ResponseResult(ResultCode.Error, null, "error");
            res.json(result);
        });    
});

router.get("/status/:id/:status", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let roomtypeService = kernel.get<RoomtypeService>(RoomtypeService);
    let id = req.params.id as string;
    let status = req.params.status as Status;

    roomtypeService.updateStatus(id, status)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            var result = new ResponseResult(ResultCode.Error, null, "error");
            res.json(result);
        });
});

export var roomtype = router;