import express = require("express");

import kernel from "../ioc/ioc.config";
import { UserService } from "../services/user.service";
import { User } from "../../app/hotel/models/user";
import { ResponseResult } from "../../app/hotel/models/responseresults";
import { ResultCode, Status } from "../../app/hotel/models/enum";

var router = express.Router();

router.get("/test", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let userService = kernel.get<UserService>(UserService);
    userService.test();
    return res.json({ result: "test function." })
});

router.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let userService = kernel.get<UserService>(UserService);
    userService.getUser()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            var result = new ResponseResult(ResultCode.Error, null, "error");
            res.json(result);
        });
});

router.post("/add", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let user = req.body as User;
    let userService = kernel.get<UserService>(UserService);

    userService.addNewUser(user)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            var result = new ResponseResult(ResultCode.Error, null, "error");
            res.json(result);
        });
});

router.post("/update", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let userService = kernel.get<UserService>(UserService);
    let user = req.body as User;
    userService.updateUser(user)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            var result = new ResponseResult(ResultCode.Error, null, "error");
            res.json(result);
        });
});

router.get("/delete/:id", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let userService = kernel.get<UserService>(UserService);
    let id = req.params.id as string;
    let status = Status.Inactive;

    userService.deleteUser(id)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            var result = new ResponseResult(ResultCode.Error, null, "error");
            res.json(result);
        });    
});

router.get("/status/:id/:status", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let userService = kernel.get<UserService>(UserService);
    let id = req.params.id as string;
    let status = req.params.status as Status;

    userService.updateStatus(id, status)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            var result = new ResponseResult(ResultCode.Error, null, "error");
            res.json(result);
        });
});

router.post("/login", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let userService = kernel.get<UserService>(UserService);
    let username = req.body.username as string;
    let password = req.body.password as string;

    userService.login(username, password)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            var result = new ResponseResult(ResultCode.Error, null, "error");
            res.json(result);
        });
});


export var user = router;