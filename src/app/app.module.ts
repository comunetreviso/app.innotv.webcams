import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TranslateCompiler, TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import * as Sentry from "@sentry/browser";
import { GOOGLE_MAPS_API_KEY, SENTRY_DSN_URL, SENTRY_ENABLED } from "./crossconcern/utilities/properties/base.property";
import { HomeComponent } from "./ui/frontoffice/home/home.component";
import { FrontofficeComponent } from "./ui/frontoffice/frontoffice.component";
import { LoginComponent } from "./ui/frontoffice/login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BackofficeComponent } from "./ui/backoffice/backoffice.component";
import { UserloggedGuard } from "./crossconcern/guard/userlogged.guard";
import { UserManager } from "./business/managers/user.manager";
import { AuthInterceptor } from "./datastore/remote/auth.interceptor";
import { HttpErrorInterceptor } from "./datastore/remote/error.interceptor";
import { ErrorHandlerHelper } from "./crossconcern/errors/errorhandler.helper";
import { LocalStorageRepositoryInterface } from "./datastore/local/localstorage.interface";
import { LocalStorageRepository } from "./datastore/local/localstorage.repository";
import { RemoteRepositoryInterface } from "./datastore/remote/remote.interface";
import { RemoteRepository } from "./datastore/remote/remote.repository";
import { UserRepository } from "./datastore/repositories/user/user.repository";
import { UserRepositoryInterface } from "./datastore/repositories/user/user.interface";
import { FormValidator } from "./crossconcern/validators/formvalidator.helper";
import { UpdateuserGuard } from "./crossconcern/guard/updateuser.guard";
import { UIService } from "./crossconcern/services/ui.service";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { WebpackTranslateLoader } from "./crossconcern/utilities/helpers/webpacktranslateloader";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { DynamicInputComponent } from "./ui/components/dynamic-input/dynamic-input/dynamic-input.component";
import { InputControlService } from "./crossconcern/services/input-control.service";
import { InputSourceService } from "./crossconcern/services/input-source.service";
import { DynamicFormComponent } from "./ui/components/dynamic-form/dynamic-form/dynamic-form.component";
import { MESSAGE_FORMAT_CONFIG, TranslateMessageFormatCompiler } from "ngx-translate-messageformat-compiler";
import { PublicServicesComponent } from "./ui/frontoffice/home/services/services.component";
import { AgmCoreModule } from "@agm/core";
import { SearchToolbarComponent } from "./ui/components/searchtoolbar/searchtoolbar.component";
import { FilterSelectorComponent } from "./ui/components/filterselector/filterselector.component";
import { HeaderContainerComponent } from "./ui/components/header/headercontainer.component";
import { PublicVideoListComponent } from "./ui/frontoffice/home/videolist/videolist.component";
import { ListSearchComponent } from "./ui/components/listsearch/listsearch.component";
import { MediaRendererComponent } from "./ui/components/mediarenderer/mediarenderer.component";
import { VideoCardComponent } from "./ui/components/videocard/videocard.component";
import { PublicWebcamListComponent } from "./ui/frontoffice/home/webcamlist/webcamlist.component";
import { VideoRepositoryInterface } from "./datastore/repositories/video/video.interface";
import { VideoRepository } from "./datastore/repositories/video/video.repository";
import { VideoManager } from "./business/managers/video.manager";
import { WebcamManager } from "./business/managers/webcam.manager";
import { WebcamRepositoryInterface } from "./datastore/repositories/webcam/webcam.interface";
import { WebcamRepository } from "./datastore/repositories/webcam/webcam.repository";
import { ServiceManager } from "./business/managers/service.manager";
import { ServiceRepositoryInterface } from "./datastore/repositories/service/service.interface";
import { ServiceRepository } from "./datastore/repositories/service/service.repository";
import { CategoriesAlertComponent } from "./ui/components/categoriesalert/categoriesalert.component";
import { SplashScreenComponent } from "./ui/components/splashscreen/splashscreen.component";
import { FooterContainerComponent } from "./ui/components/footer/footercontainer.component";

// Application wide providers
const APP_PROVIDERS = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: ErrorHandlerHelper },
    UserloggedGuard,
    UpdateuserGuard,
    // Managers
    UserManager,
    VideoManager,
    WebcamManager,
    ServiceManager,
    // Repositories
    { provide: LocalStorageRepositoryInterface, useClass: LocalStorageRepository },
    { provide: RemoteRepositoryInterface, useClass: RemoteRepository },
    { provide: UserRepositoryInterface, useClass: UserRepository },
    { provide: VideoRepositoryInterface, useClass: VideoRepository },
    { provide: WebcamRepositoryInterface, useClass: WebcamRepository },
    { provide: ServiceRepositoryInterface, useClass: ServiceRepository },
    // Helpers
    ErrorHandlerHelper,
    FormValidator,
    // Services
    UIService,
    InputControlService,
    InputSourceService
];

Sentry.init({
    dsn: SENTRY_DSN_URL,
    enabled: JSON.parse(SENTRY_ENABLED) as boolean
});

@NgModule({
    declarations: [
        AppComponent,
        // backoffice
        BackofficeComponent,
        // public
        HomeComponent,
        FrontofficeComponent,
        LoginComponent,
        PublicServicesComponent,
        PublicVideoListComponent,
        PublicWebcamListComponent,
        // components
        DynamicInputComponent,
        DynamicFormComponent,
        HeaderContainerComponent,
        FooterContainerComponent,
        SearchToolbarComponent,
        FilterSelectorComponent,
        ListSearchComponent,
        VideoCardComponent,
        MediaRendererComponent,
        SplashScreenComponent,
        // alerts
        CategoriesAlertComponent
    ],
    entryComponents: [
        CategoriesAlertComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModalModule,
        NgxDatatableModule,
        AppRoutingModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useClass: WebpackTranslateLoader
            },
            compiler: {
                provide: TranslateCompiler,
                useClass: TranslateMessageFormatCompiler
            }
        }),
        ServiceWorkerModule.register("ngsw-worker.js", { enabled: environment.production }),
        AgmCoreModule.forRoot({
            apiKey: GOOGLE_MAPS_API_KEY
        })
    ],
    providers: [
        APP_PROVIDERS,
        { provide: MESSAGE_FORMAT_CONFIG, useValue: { locales: [
            "en", "it"
        ] } }
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
