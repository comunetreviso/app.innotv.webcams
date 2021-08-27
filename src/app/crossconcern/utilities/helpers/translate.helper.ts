/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
    providedIn: "root"
})

export class TranslateHelper {
    constructor(public translate: TranslateService) {}

    translateTo(lang: string) {
        if (lang !== "it" && lang !== "en") {
            this.translate.use(this.translate.getBrowserLang());
        } else {
            this.translate.use(lang);
        }
    }

}
