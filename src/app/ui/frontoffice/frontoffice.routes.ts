import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import {
    PUBLIC_HOME_ROUTE,
    PUBLIC_LOGIN_ROUTE,
    PUBLIC_SERVICES_ROUTE,
    PUBLIC_VIDEO_LIST_ROUTE,
    PUBLIC_WEBCAM_LIST_ROUTE
} from "../../crossconcern/utilities/properties/routename.property";
import { LoginComponent } from "./login/login.component";
import {
    PUBLIC_HOME_PATH,
    PUBLIC_LOGIN_PATH,
    PUBLIC_SERVICES_PATH,
    PUBLIC_VIDEO_LIST_PATH,
    PUBLIC_WEBCAM_LIST_PATH
} from "src/app/crossconcern/utilities/properties/path.property";
import { PublicServicesComponent } from "./home/services/services.component";
import { PublicVideoListComponent } from "./home/videolist/videolist.component";
import { PublicWebcamListComponent } from "./home/webcamlist/webcamlist.component";

export const FRONTOFFICE_ROUTES: Routes = [
    {
        path: "",
        redirectTo: PUBLIC_HOME_PATH + "/" + PUBLIC_SERVICES_PATH,
        pathMatch: "full"
    },
    {
        path: PUBLIC_HOME_PATH,
        component: HomeComponent,
        data: {
            routeName: PUBLIC_HOME_ROUTE
        },
        children: [
            {
                path: PUBLIC_SERVICES_PATH,
                component: PublicServicesComponent,
                data: {
                    routeName: PUBLIC_SERVICES_ROUTE
                }
            },
            {
                path: PUBLIC_VIDEO_LIST_PATH,
                component: PublicVideoListComponent,
                data: {
                    routeName: PUBLIC_VIDEO_LIST_ROUTE
                }
            },
            {
                path: PUBLIC_WEBCAM_LIST_PATH,
                component: PublicWebcamListComponent,
                data: {
                    routeName: PUBLIC_WEBCAM_LIST_ROUTE
                }
            }
        ]
    },
    {
        path: PUBLIC_LOGIN_PATH,
        component: LoginComponent,
        data: {
            routeName: PUBLIC_LOGIN_ROUTE
        }
    }
];
