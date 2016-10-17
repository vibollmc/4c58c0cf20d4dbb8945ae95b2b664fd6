import express = require("express");
import jwt = require("jsonwebtoken");

import ApiConfig from "../config";
import kernel from "../ioc/ioc.config";
import { UserService } from "../services/user.service";
import { User } from "../../app/hotel/models/user";
import { ResponseResult } from "../../app/hotel/models/responseresults";
import { ResultCode } from "../../app/hotel/models/enum";

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
            res.json(new ResponseResult(ResultCode.Error, null, "error"));
        });
});

router.post("/add", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let user = req.body as User;
    let userService = kernel.get<UserService>(UserService);
    user.createdBy = req.params.userid;
    userService.addNewUser(user)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(new ResponseResult(ResultCode.Error, null, "error"));
        });
});

router.post("/update", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let userService = kernel.get<UserService>(UserService);
    let user = req.body as User;
    user.updatedBy = req.params.userid;
    
    userService.updateUser(user)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(new ResponseResult(ResultCode.Error, null, "error"));
        });
});

router.get("/delete/:id", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let userService = kernel.get<UserService>(UserService);
    let id = req.params.id as string;

    userService.deleteUser(id)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(new ResponseResult(ResultCode.Error, null, "error"));
        });    
});

router.post("/status", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let userService = kernel.get<UserService>(UserService);
    let id = req.body.id as string;
    let active = req.body.active as boolean;

    userService.updateStatus(id, active)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(new ResponseResult(ResultCode.Error, null, "error"));
        });
});

router.post("/login", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let userService = kernel.get<UserService>(UserService);
    let username = req.body.username as string;
    let password = req.body.password as string;

    userService.login(username, password)
        .then((data) => {
            if (data.data != null) {
                var token = jwt.sign(data.data, ApiConfig.secret, {expiresIn: 86400});

                res.json(new ResponseResult(ResultCode.Success, token, "Login Successfully."));
            }
            else {
                res.json(new ResponseResult(ResultCode.Error, null, "login fail."));   
            }
        })
        .catch((err) => {
            res.json(new ResponseResult(ResultCode.Error, null, "error"));
        });
});

export var user = router;