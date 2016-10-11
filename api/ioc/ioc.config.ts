import { Kernel } from "inversify";
import "reflect-metadata";

import { MongoDbAccess } from "../../dbservices/database.access";
import { BaseRepository } from "../repositories/base.repository";
import { ListRepository } from "../repositories/list.repository";
import { UserRepository } from "../repositories/user.repository";

import { UserService } from "../services/user.service";
import { ListService } from "../services/list.service";

let kernel = new Kernel();

kernel.bind<MongoDbAccess>(MongoDbAccess).toSelf().inSingletonScope();
kernel.bind<BaseRepository>(BaseRepository).toSelf();
kernel.bind<ListRepository>(ListRepository).toSelf();

kernel.bind<UserRepository>(UserRepository).toSelf();
kernel.bind<UserService>(UserService).toSelf();
kernel.bind<ListService>(ListService).toSelf();

export default kernel;