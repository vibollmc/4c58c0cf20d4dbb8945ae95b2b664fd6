import * as http from "http";
import * as url from "url";
import * as express from "express";
import * as bodyParser from "body-parser";
import cors = require('cors');

import { roomtype } from "./api/routes/roomtype";

let api = express();
api.use(cors());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());

/*
api.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
*/


api.use("/api/roomtype", roomtype);

api.listen(8080, () => {
  console.log("Api server listening on port %d in %s mode", 8080, api.settings.env);
});

export var App = api;