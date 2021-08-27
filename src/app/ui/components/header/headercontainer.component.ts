import { Component, OnInit } from "@angular/core";
import { HEADER_CONTAINER_SELECTOR } from "src/app/crossconcern/utilities/properties/selector.property";
import * as app from "package.json";
import { ActivatedRoute, Router } from "@angular/router";
import { PUBLIC_ROUTES } from "../../../crossconcern/utilities/properties/route.property";

@Component({
    selector: HEADER_CONTAINER_SELECTOR,
    templateUrl: "./headercontainer.component.html"
})
export class HeaderContainerComponent implements OnInit {
    public version = app.version;
    public route = "";
    constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

    public ngOnInit(): void {
        this.route = this.router.url.split("/")[2];
        this.excludeParameter("lang");
        if (this.route !== undefined) {
            this.route = String(PUBLIC_ROUTES[this.route]);
        }
    }

    private excludeParameter(paramName: string): void {
        const queryParamMap = this.activatedRoute.snapshot.queryParamMap;
        if (queryParamMap.has(paramName)) {
            if (queryParamMap.keys.length === 1) {
                this.route = this.route.split("?")[0];
            } else {
                this.route = this.route.split("?")[0];
                for (let i = 0; i < queryParamMap.keys.length; i++) {
                    if (i === 0) this.route += "?";
                    if (queryParamMap.keys[i] !== paramName) {
                        this.route =
                            this.route +
                            queryParamMap.keys[i] +
                            "=" +
                            queryParamMap.get(queryParamMap.keys[i]);
                        if (i !== queryParamMap.keys.length - 1 &&
                            queryParamMap.keys[i + 1] !== paramName) {
                            this.route += "&";
                        }
                    }
                }
            }
        }
    }
}
