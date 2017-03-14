import { injectable } from 'inversify';

import { CheckInRepository } from "../repositories/checkin.repository";
import { ResponseResult } from "../../app/hotel/models/responseresults";
import { CheckedIn } from "../../app/hotel/models/checkedin";

@injectable()
export class CheckInService {
    constructor(private _checkInRepository: CheckInRepository) {

    }

    public addNew(obj: CheckedIn): Promise<ResponseResult> {
        return this._checkInRepository.addNew(obj);
    }

    public update(obj: CheckedIn): Promise<ResponseResult> {
        return this._checkInRepository.update(obj);
    }

    public updateStatus(id: string, active: boolean): Promise<ResponseResult> {
        return this._checkInRepository.updateStatus(id, active);
    }

    public delete(id: string): Promise<ResponseResult> {
        return this._checkInRepository.delete(id);
    }
}