import * as express from "express";
import * as bodyParser from "body-parser";
import * as jwt from "jsonwebtoken";
import * as cors from "cors";
import * as morgan from "morgan";

import kernel from "./api/ioc/ioc.config";
import ApiConfig from "./api/config";

import { MongoDbAccess } from "./dbservices/database.access";
import { ResultCode } from "./app/hotel/models/enum";
import { ResponseResult } from "./app/hotel/models/responseresults";

import { listRouter } from "./api/routes/list";
import { userRouter } from "./api/routes/user";
import { bookingRouter } from "./api/routes/booking";
import { checkinRouter } from "./api/routes/checkin";

let app = express();
// allow CORS
app.use(cors());

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

//check token
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  // allow unauthenticate on login.
  if (req.url.toLowerCase() === '/api/user/login' || req.url.toLowerCase() === '/api/user/test') {
    next();
  }
  else {
    // check header or url parameters or post parameters for token
    let token = req.body.token || req.params.token || req.headers['x-access-token'];
    // decode token
    if (token) {

      // verifies secret and checks exp
      jwt.verify(token, ApiConfig.secret, (err, decoded) => {
        if (err) {
          return res.json(new ResponseResult(ResultCode.LoginFail, null, 'Failed to authenticate token.'));
        } else {
          // if everything is good, save to request for use in other routes
          console.log('user request: ' + decoded._id);
          
          if (req.url.toLocaleLowerCase() === '/api/user/logged') {
            var name = decoded.fullName;
            if (name == null) decoded.userName;
            
            return res.json(new ResponseResult(ResultCode.Success, {fullName: name, group: decoded.group}, ""));
          }
          else {
            req.userid = decoded._id;
            next();
          }
          
        }
      });

    }
    else {
      // if there is no token
      // return an error
      return res.status(403).send(new ResponseResult(ResultCode.LoginFail, null, 'No token provided.'));
    }
  }
});

app.use("/api/list", listRouter);
app.use("/api/user", userRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/checkin", checkinRouter);

app.listen(8080, () => {
  console.log("Api server listening on port %d in %s mode", 8080, app.settings.env);

  //open connection
  let dbAccess = kernel.get<MongoDbAccess>(MongoDbAccess);
  dbAccess.connectToDb();
});

export var App = app;