import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { UserManager } from "../../business/managers/user.manager";
import { switchMap } from "rxjs/internal/operators/switchMap";
import { of } from "rxjs/internal/observable/of";
import { logData } from "../utilities/helpers/log.helper";
import { Observable } from "rxjs";

@Injectable()
export class UpdateuserGuard implements CanActivate {

    constructor(private userManager: UserManager) {}

    public canActivate(): true | Observable<boolean> {
        if (this.userManager.userIsLogged()) {
            logData("CURRENT USER", this.userManager.getCurrentUser());
            if (this.userManager.getCurrentUser()) {
                return true;
            }
            logData("UPDATING USER", this.userManager.getCurrentUser());
            return this.userManager.refreshMe().pipe(
                switchMap(() => of(true))
            );
        }
        return true;
    }
}
