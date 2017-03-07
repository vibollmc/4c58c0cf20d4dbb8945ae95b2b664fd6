import * as express from "express";

import kernel from "../ioc/ioc.config";
import { BookingService } from "../services/booking.service";
import { ResponseResult } from "../../app/hotel/models/responseresults";
import { ResultCode } from "../../app/hotel/models/enum";
import { Booking } from "../../app/hotel/models/booking";

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

router.post("/add", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    
    let service = kernel.get<BookingService>(BookingService);

    let obj = req.body as Booking;
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
    let service = kernel.get<BookingService>(BookingService);

    let obj = req.body as Booking;
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
    let service = kernel.get<BookingService>(BookingService);

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
    let service = kernel.get<BookingService>(BookingService);

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

router.post("/search", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let service = kernel.get<BookingService>(BookingService);

    let fromDate = req.body.fromDate as Date;
    let toDate = req.body.toDate as Date;
    let searchText = req.body.searchText as string;

    service.search(fromDate, toDate, searchText)
    .then(data => res.json(data))
    .catch(err => {
        res.json(new ResponseResult(ResultCode.Error, null, "error"));
    });
});

export var bookingRouter = router;
