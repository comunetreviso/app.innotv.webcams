import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserModel } from "../../entities/user.model";

@Injectable()
export abstract class UserRepositoryInterface {

    public abstract login(email: string, password: string): Observable<string>;
    public abstract logout(): void;
    public abstract userIsLogged(): boolean;
    public abstract getMe(): Observable<UserModel>;
}
