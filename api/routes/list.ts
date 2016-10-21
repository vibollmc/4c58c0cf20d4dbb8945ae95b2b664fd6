import express = require("express");

import kernel from "../ioc/ioc.config";
import { ListService } from "../services/list.service";
import { ResponseResult } from "../../app/hotel/models/responseresults";
import { ResultCode } from "../../app/hotel/models/enum";

var router = express.Router();

router.get("/:collection", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let listService = kernel.get<ListService>(ListService);
    let collection = req.params.collection as string;
    
    if (collection === undefined || collection === null || collection === "") {
        console.log("collection cannot be null: " + req.url);
        return;
    }
    listService.collectionName = collection;

    listService.get()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            var result = new ResponseResult(ResultCode.Error, null, "error");
            res.json(result);
        });
});

router.post("/:collection/add", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    
    let listService = kernel.get<ListService>(ListService);
    let collection = req.params.collection as string;
    
    if (collection === undefined || collection === null || collection === "") {
        console.log("collection cannot be null: " + req.url);
        return;
    }
    listService.collectionName = collection;

    let obj = req.body;
    obj.createdBy = req.userid;
    listService.addNew(obj)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            var result = new ResponseResult(ResultCode.Error, null, "error");
            res.json(result);
        });
});

router.post("/:collection/update", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let listService = kernel.get<ListService>(ListService);
    let collection = req.params.collection as string;
    
    if (collection === undefined || collection === null || collection === "") {
        console.log("collection cannot be null: " + req.url);
        return;
    }
    listService.collectionName = collection;

    let obj = req.body
    obj.updatedBy = req.userid;

    listService.update(obj)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            var result = new ResponseResult(ResultCode.Error, null, "error");
            res.json(result);
        });
});

router.get("/:collection/delete/:id", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let listService = kernel.get<ListService>(ListService);
    let collection = req.params.collection as string;
    
    if (collection === undefined || collection === null || collection === "") {
        console.log("collection cannot be null: " + req.url);
        return;
    }
    listService.collectionName = collection;

    let id = req.params.id as string;

    listService.delete(id)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            var result = new ResponseResult(ResultCode.Error, null, "error");
            res.json(result);
        });    
});

router.post("/:collection/status", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let listService = kernel.get<ListService>(ListService);
    let collection = req.params.collection as string;
    
    if (collection === undefined || collection === null || collection === "") {
        console.log("collection cannot be null: " + req.url);
        return;
    }
    listService.collectionName = collection;

    let id = req.body.id as string;
    let active = req.body.active as boolean;

    listService.updateStatus(id, active)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            var result = new ResponseResult(ResultCode.Error, null, "error");
            res.json(result);
        });
});

export var listRouter = router;