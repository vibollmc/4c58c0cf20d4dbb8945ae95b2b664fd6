import { injectable } from "inversify";

import { UserRepository } from "../repositories/user.repository";
import { User } from "../../app/hotel/models/user";
import { ResponseResult } from "../../app/hotel/models/responseresults";

@injectable()
export class UserService {
    
    constructor(private userRepository: UserRepository) {
    }

    public addNewUser(user: User): Promise<ResponseResult> {
        return this.userRepository.addNewUser(user);
    }

    public updateUser(user: User): Promise<ResponseResult> {
        return this.userRepository.updateUser(user);
    }

    public updateStatus(id: string, active: boolean): Promise<ResponseResult> {
        return this.userRepository.updateStatus(id, active);
    } 
    public getUser(): Promise<ResponseResult> {
        return this.userRepository.getUser();
    }
    public deleteUser(id: string): Promise<ResponseResult> {
        return this.userRepository.deleteUser(id);
    }

    public login(username: string, password: string): Promise<ResponseResult> {
        return this.userRepository.login(username, password);
    }

    public test() {
        this.userRepository.test();
    }
}