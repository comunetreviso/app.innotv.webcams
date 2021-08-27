import { Component, OnInit } from "@angular/core";
import { AlertHelper } from "src/app/crossconcern/utilities/helpers/alert.helper";
import { UserManager } from "../../../business/managers/user.manager";
import { logData } from "../../../crossconcern/utilities/helpers/log.helper";
import { NamedRoutesHelper } from "../../../crossconcern/utilities/helpers/namedroutes.helper";
import { PRIVATE_MAIN_ROUTE } from "../../../crossconcern/utilities/properties/routename.property";
import { UIService } from "../../../crossconcern/services/ui.service";
import { finalize } from "rxjs/operators";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: [
        "./login.component.scss"
    ]
})
export class LoginComponent implements OnInit {
    email: string;
    password: string;
    rememberMe = false;

    constructor(
        private userManager: UserManager,
        private namedRoutesHelper: NamedRoutesHelper,
        private uiService: UIService,
        private alertHelper: AlertHelper
    ) {
        // no content
    }

    ngOnInit(): void {
        // no content
    }

    login(): void {
        this.uiService.setLoading(true);
        this.userManager.login("eve.holt@reqres.in", "cityslicka")
            .pipe(
                finalize(() => this.uiService.setLoading(false))
            )
            .subscribe(
                () => {
                    logData("LOGIN", "success");
                    void this.namedRoutesHelper.goToRouteByName(PRIVATE_MAIN_ROUTE);
                }
            );
    }

    forgotPassword(): void {
        this.alertHelper.showAlert("test title", "test message");
    }
}
