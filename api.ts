import * as http from "http";
import * as url from "url";
import * as express from "express";
import * as bodyParser from "body-parser";
import cors = require('cors');

import { listRouter } from "./api/routes/list";
import { user } from "./api/routes/user";

let api = express();
api.use(cors());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());

api.use("/api/list", listRouter);
api.use("/api/user", user);

api.listen(8080, () => {
  console.log("Api server listening on port %d in %s mode", 8080, api.settings.env);
});

export var App = api;