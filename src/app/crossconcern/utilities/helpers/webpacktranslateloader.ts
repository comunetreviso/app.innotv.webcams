import { TranslateLoader } from "@ngx-translate/core";
import { from, Observable } from "rxjs";

export class WebpackTranslateLoader implements TranslateLoader {
    getTranslation(lang: string): Observable<unknown> {
        return from(
            Promise.all([
                import(`../../../../assets/i18n/${lang}.json`),
                import(`../../../ui/backoffice/i18n/${lang}.json`),
                import(`../../../ui/frontoffice/i18n/${lang}.json`)
            ]).then((i18ns) => {
                const global = {};
                i18ns.forEach((i18n: { default? }) => {
                    Object.assign(global, i18n.default || i18n);
                });
                return global;
            })
        );
    }
}