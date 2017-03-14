import { Kernel } from "inversify";
import "reflect-metadata";

import { MongoDbAccess } from "../../dbservices/database.access";
import { BaseRepository } from "../repositories/base.repository";
import { ListRepository } from "../repositories/list.repository";
import { UserRepository } from "../repositories/user.repository";
import { BookingRepository } from "../repositories/booking.repository";
import { CheckInRepository } from "../repositories/checkin.repository";

import { UserService } from "../services/user.service";
import { ListService } from "../services/list.service";
import { BookingService } from "../services/booking.service";
import { CheckInService } from "../services/checkin.service";

let kernel = new Kernel();

kernel.bind<MongoDbAccess>(MongoDbAccess).toSelf().inSingletonScope();

kernel.bind<BaseRepository>(BaseRepository).toSelf();
kernel.bind<ListRepository>(ListRepository).toSelf();
kernel.bind<BookingRepository>(BookingRepository).toSelf();
kernel.bind<UserRepository>(UserRepository).toSelf();
kernel.bind<CheckInRepository>(CheckInRepository).toSelf();

kernel.bind<UserService>(UserService).toSelf();
kernel.bind<ListService>(ListService).toSelf();
kernel.bind<BookingService>(BookingService).toSelf();
kernel.bind<CheckInRepository>(CheckInRepository).toSelf();

export default kernel;