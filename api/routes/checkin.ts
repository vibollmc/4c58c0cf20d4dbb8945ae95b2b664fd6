import * as express from "express";

import kernel from "../ioc/ioc.config";
import { CheckInService } from "../services/checkin.service";
import { ResponseResult } from "../../app/hotel/models/responseresults";
import { ResultCode } from "../../app/hotel/models/enum";
import { CheckedIn } from "../../app/hotel/models/checkedin";

var router = express.Router();

router.post("/add", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    
    let service = kernel.get<CheckInService>(CheckInService);

    let obj = req.body as CheckedIn;
    obj.createdBy = req.userid;
    service.addNew(obj)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            var result = new ResponseResult(ResultCode.Error, null, "error");
            res.json(result);
        });
});

router.post("/update", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let service = kernel.get<CheckInService>(CheckInService);

    let obj = req.body as CheckedIn;
    obj.updatedBy = req.userid;

    service.update(obj)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            var result = new ResponseResult(ResultCode.Error, null, "error");
            res.json(result);
        });
});

router.get("/delete/:id", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let service = kernel.get<CheckInService>(CheckInService);

    let id = req.params.id as string;

    service.delete(id)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            var result = new ResponseResult(ResultCode.Error, null, "error");
            res.json(result);
        });    
});

router.post("/status", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let service = kernel.get<CheckInService>(CheckInService);

    let id = req.body.id as string;
    let active = req.body.active as boolean;

    service.updateStatus(id, active)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            var result = new ResponseResult(ResultCode.Error, null, "error");
            res.json(result);
        });
});

export var checkinRouter = router;
