import { NgModule } from "@angular/core";
import { Routes, RouterModule, Route } from "@angular/router";
import { FrontofficeComponent } from "./ui/frontoffice/frontoffice.component";
import { FRONTOFFICE_ROUTES } from "./ui/frontoffice/frontoffice.routes";
import { PRIVATE_MAIN_ROUTE, ROOT_ROUTE } from "./crossconcern/utilities/properties/routename.property";
import { BackofficeComponent } from "./ui/backoffice/backoffice.component";
import { UserloggedGuard } from "./crossconcern/guard/userlogged.guard";
import { UpdateuserGuard } from "./crossconcern/guard/updateuser.guard";
import { PRIVATE_MAIN_PATH } from "./crossconcern/utilities/properties/path.property";

const ROUTES: Routes = [
    {
        path: "",
        component: FrontofficeComponent,
        children: FRONTOFFICE_ROUTES
    },
    {
        path: PRIVATE_MAIN_PATH,
        component: BackofficeComponent,
        canActivate: [
            UserloggedGuard,
            UpdateuserGuard
        ],
        data: {
            routeName: PRIVATE_MAIN_ROUTE
        }
    },
    { path: "**", redirectTo: "" }
];

const recursiveMapping = (routes: Routes, fatherPath = "", map = {}) => {
    routes.forEach((route: Route) => {
        const currentPath = fatherPath + (route.path ? "/" + route.path : "");
        if (route.data && route.data.routeName) {
            map[(route.data.routeName as string)] = currentPath;
        }
        if (route.children) {
            recursiveMapping(route.children, currentPath, map);
        }
    });
    map[ROOT_ROUTE] = "/";
    return map;
};

export const ROUTE_PATH_BY_NAME: {[key: string]: string} = recursiveMapping(ROUTES);

@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
