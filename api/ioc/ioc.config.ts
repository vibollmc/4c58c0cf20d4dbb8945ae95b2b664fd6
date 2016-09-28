import { Kernel } from "inversify";
import "reflect-metadata";

import { MongoDbAccess } from "../../dbservices/database.access";
import { BaseRepository } from "../repositories/base.repository";

import { RoomtypeRepository } from "../repositories/roomtype.repository";
import { RoomtypeService } from "../services/roomtype.service";

import { UserRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.service";

let kernel = new Kernel();

kernel.bind<MongoDbAccess>(MongoDbAccess).toSelf().inSingletonScope();
kernel.bind<BaseRepository>(BaseRepository).toSelf();

kernel.bind<RoomtypeRepository>(RoomtypeRepository).toSelf();
kernel.bind<RoomtypeService>(RoomtypeService).toSelf();

kernel.bind<UserRepository>(UserRepository).toSelf();
kernel.bind<UserService>(UserService).toSelf();

export default kernel;