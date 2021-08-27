import { Injectable } from "@angular/core";
import { BaseManager } from "./base.manager";
import { BehaviorSubject, Observable } from "rxjs";
import { UserRepositoryInterface } from "../../datastore/repositories/user/user.interface";
import { UserModel } from "../../datastore/entities/user.model";
import { tap } from "rxjs/internal/operators/tap";

@Injectable()
export class UserManager extends BaseManager {

    private currentUserSubject: BehaviorSubject<UserModel>;
    private readonly currentUserObservable: Observable<UserModel>;

    constructor(
        private userRepository: UserRepositoryInterface) {
        super();
        this.currentUserSubject = new BehaviorSubject<UserModel>(null);
        this.currentUserObservable = this.currentUserSubject.asObservable();
    }

    public login(email: string, password: string): Observable<string> {
        return this.userRepository.login(email, password);
    }

    public logout(): void {
        this.userRepository.logout();
    }

    public userIsLogged(): boolean {
        return this.userRepository.userIsLogged();
    }

    public refreshMe(): Observable<UserModel> {
        return this.userRepository.getMe()
            .pipe(
                tap((user: UserModel) => {
                    this.currentUserSubject.next(user);
                })
            );
    }

    public getCurrentUser(): UserModel {
        return this.currentUserSubject.value;
    }
}
