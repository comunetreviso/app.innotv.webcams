import { Injectable } from "@angular/core";
import { UserRepositoryInterface } from "./user.interface";
import { RemoteRepositoryInterface } from "../../remote/remote.interface";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { LoginResponseModel } from "../../entities/loginresponse.model";
import { LocalStorageRepositoryInterface } from "../../local/localstorage.interface";
import { UserModel } from "../../entities/user.model";

@Injectable()
export class UserRepository implements UserRepositoryInterface {

    constructor(
        private remoteRepository: RemoteRepositoryInterface,
        private localStorageRepository: LocalStorageRepositoryInterface) {}

    public login(email: string, password: string): Observable<string> {
        const body = {
            email,
            password
        };
        return this.remoteRepository.post("/login", body).pipe(
            map((response: JSON) => {
                return (new LoginResponseModel(response)).token;
            }),
            tap((token: string) => this.localStorageRepository.setToken(token))
        );
    }

    public logout(): void {
        this.localStorageRepository.removeToken();
    }

    public userIsLogged(): boolean {
        const token = this.localStorageRepository.getToken();
        return token != null;
    }

    public getMe(): Observable<UserModel> {
        return this.remoteRepository.get("/users/2").pipe(
            map((response: JSON) => {
                return (new UserModel(response));
            })
        );
    }
}
