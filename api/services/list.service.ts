import { injectable } from "inversify";

import { ListRepository } from "../repositories/list.repository";
import { ResponseResult } from "../../app/hotel/models/responseresults";

@injectable()
export class ListService {
    public set collectionName(name: string) {
        this._listRepository.collectionName = name;
    }
    constructor(private _listRepository: ListRepository) {
    }

    public addNew(obj: any): Promise<ResponseResult> {
        return this._listRepository.addNew(obj);
    }

    public update(obj: any): Promise<ResponseResult> {
        return this._listRepository.update(obj);
    }

    public updateStatus(id: string, active: boolean): Promise<ResponseResult> {
        return this._listRepository.updateStatus(id, active);
    } 
    public get(filter?: any): Promise<ResponseResult> {
        return this._listRepository.get(filter);
    }
    public delete(id: string): Promise<ResponseResult> {
        return this._listRepository.delete(id);
    }
}