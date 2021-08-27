import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TranslateHelper } from "../../crossconcern/utilities/helpers/translate.helper";

@Component({
    selector: "app-frontoffice",
    templateUrl: "./frontoffice.component.html",
    styleUrls: [
        "./frontoffice.component.scss"
    ]
})
export class FrontofficeComponent implements OnInit {

    constructor(
        private translate: TranslateHelper,
        private route: ActivatedRoute) {}

    ngOnInit(): void {
        const lang = this.route.snapshot.queryParamMap.get("lang");
        this.translate.translateTo(lang);
    }
}
