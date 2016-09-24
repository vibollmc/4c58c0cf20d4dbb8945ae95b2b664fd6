import { Kernel } from "inversify";
import "reflect-metadata";

import { MongoDbAccess } from "../../dbservices/database.access";
import { RoomtypeRepository } from "../repositories/roomtype.repository";
import { RoomtypeService } from "../services/roomtype.service";

let kernel = new Kernel();

kernel.bind<MongoDbAccess>(MongoDbAccess).toSelf();
kernel.bind<RoomtypeRepository>(RoomtypeRepository).toSelf();
kernel.bind<RoomtypeService>(RoomtypeService).toSelf();

export default kernel;