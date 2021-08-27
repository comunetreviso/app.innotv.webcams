import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { UserManager } from "../../business/managers/user.manager";
import { NamedRoutesHelper } from "../utilities/helpers/namedroutes.helper";
import { ROOT_ROUTE } from "../utilities/properties/routename.property";

@Injectable()
export class UserloggedGuard implements CanActivate {

    constructor(private namedRoutesHelper: NamedRoutesHelper, private userManager: UserManager) {}

    public canActivate(): boolean {
        if (this.userManager.userIsLogged()) {
            return true;
        }
        void this.namedRoutesHelper.goToRouteByName(ROOT_ROUTE);
        return false;
    }
}
