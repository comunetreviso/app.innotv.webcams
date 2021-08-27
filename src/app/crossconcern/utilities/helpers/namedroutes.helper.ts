import { Injectable } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";

@Injectable({
    providedIn: "root"
})
export class NamedRoutesHelper {
    protected routeByNamePromise: Promise<{[key: string]: string}> = null;

    constructor(protected router: Router) {
        this.routeByNamePromise = import("../../../app-routing.module")
            .then(({ ROUTE_PATH_BY_NAME }) => {
                return ROUTE_PATH_BY_NAME;
            });
    }

    public goToRouteByName(
        routeName: string,
        urlParams: {[key: string]: string} = {},
        queryParams?: unknown): Promise<boolean> {
        return this.goToRouteByNameWithExtras(routeName, urlParams, {
            queryParams
        });
    }

    public goToRouteByNameWithExtras(
        routeName: string,
        urlParams: {[key: string]: string},
        extras: NavigationExtras): Promise<boolean> {
        return this.interpolateUrlByName(routeName, urlParams)
            .then((urlPath) => {
                return this.router.navigate(
                    [
                        urlPath
                    ],
                    extras
                );
            });
    }

    public externalUrlByName(routeName: string, urlParams: {[key: string]: string}): Promise<string> {
        return this.getUrlByName(routeName)
            .then((routerPath) => {
                return window.location.origin + this.interpolateUrl(routerPath, urlParams);
            });
    }

    public interpolateUrlByName(routeName: string, urlParams: {[key: string]: string}): Promise<string> {
        return this.getUrlByName(routeName)
            .then((routerPath) => {
                return this.interpolateUrl(routerPath, urlParams);
            });
    }

    public getUrlByName(routeName: string): Promise<string> {
        return this.routeByNamePromise
            .then((routeByName) => {
                return routeByName[routeName];
            });
    }

    public interpolateUrl(routerPath: string, params: {[key: string]: string}): string {
        return routerPath.replace(
            new RegExp("/:([a-zA-Z0-9]+)", "g"),
            (_, paramName: string) => {
                return "/" + (params[paramName] ? params[paramName] : "");
            }
        );
    }
}
