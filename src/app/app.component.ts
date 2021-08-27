import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { UIService } from "./crossconcern/services/ui.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: [
        "./app.component.scss"
    ]
})
export class AppComponent implements OnInit {

    public isLoading: boolean;

    constructor(
        private translate: TranslateService,
        private route: ActivatedRoute,
        private uiService: UIService) {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang("en");
        // the lang to use, if the lang isn't available, it will use the current loader to get them
        // logData("browser lang " + translate.getBrowserLang());
    }

    ngOnInit(): void {
        this.uiService.loadingObservable.subscribe((isLoading) => {
            this.isLoading = isLoading;
            // We set the value in the --vh custom property to the root of the document
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty("--vh", `${vh}px`);
        });
    }
}
