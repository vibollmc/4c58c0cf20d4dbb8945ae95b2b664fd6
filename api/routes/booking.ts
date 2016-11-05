import * as express from "express";

import kernel from "../ioc/ioc.config";
import { BookingService } from "../services/booking.service";
import { ResponseResult } from "../../app/hotel/models/responseresults";
import { ResultCode } from "../../app/hotel/models/enum";

var router = express.Router();

router.post("/roomavalidable", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let service = kernel.get<BookingService>(BookingService);

    let fromDate = req.body.fromDate as Date;
    let toDate = req.body.toDate as Date;

    service.getRoomsAvalidable(fromDate, toDate)
    .then(data => res.json(data))
    .catch(err => {
        res.json(new ResponseResult(ResultCode.Error, null, "error"));
    });
});

export var bookingRouter = router;
