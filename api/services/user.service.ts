import { injectable } from "inversify";

import { UserRepository } from "../repositories/user.repository";
import { User } from "../../app/hotel/models/user";
import { ResponseResult } from "../../app/hotel/models/responseresults";

@injectable()
export class UserService {
    
    constructor(private _userRepository: UserRepository) {
    }

    public addNewUser(user: User): Promise<ResponseResult> {
        return this._userRepository.addNewUser(user);
    }

    public updateUser(user: User): Promise<ResponseResult> {
        return this._userRepository.updateUser(user);
    }

    public updateStatus(id: string, active: boolean): Promise<ResponseResult> {
        return this._userRepository.updateStatus(id, active);
    } 
    public getUser(): Promise<ResponseResult> {
        return this._userRepository.getUser();
    }
    public deleteUser(id: string): Promise<ResponseResult> {
        return this._userRepository.deleteUser(id);
    }

    public login(username: string, password: string): Promise<ResponseResult> {
        return this._userRepository.login(username, password);
    }

    public test() {
        this._userRepository.test();
    }
}