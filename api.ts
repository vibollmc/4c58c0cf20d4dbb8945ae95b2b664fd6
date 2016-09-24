import * as http from "http";
import * as url from "url";
import * as express from "express";
import * as bodyParser from "body-parser";

import { roomtype } from "./api/routes/roomtype";

let api = express();

api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());

api.use("/roomtype", roomtype);

api.listen(8080, function(){
    console.log("Api server listening on port %d in %s mode", 8080, api.settings.env);
});

export var App = api;