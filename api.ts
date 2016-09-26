import * as http from "http";
import * as url from "url";
import * as express from "express";
import * as bodyParser from "body-parser";
import cors = require('cors');

import { roomtype } from "./api/routes/roomtype";

let api = express();

api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());
/*
api.use((req, res, next) => {
  if ('OPTIONS' == req.method) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    //res.send(200);
  }
  else {
    next();
  }
});
*/

api.options('*', cors());

api.use("/api/roomtype", cors(), roomtype);

api.listen(8080, () => {
  console.log("Api server listening on port %d in %s mode", 8080, api.settings.env);
});

export var App = api;