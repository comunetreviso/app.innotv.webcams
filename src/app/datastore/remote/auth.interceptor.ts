/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Injectable } from "@angular/core";
import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent } from "@angular/common/http";
import { from, Observable } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { AUTH_SHARED_SECRET } from "src/app/crossconcern/utilities/properties/base.property";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        let updatedReq = req.clone({});

        const timestamp = new Date().valueOf();

        return from(this.digestMessage(timestamp + AUTH_SHARED_SECRET).then((hashString) => {
            updatedReq = updatedReq.clone({
                headers: updatedReq.headers.append(
                    "Authorization",
                    timestamp + "_" + hashString
                )
            });
            return next.handle(updatedReq);
        })).pipe(
            mergeMap((value) => value)
        );
    }

    private async digestMessage(message: string): Promise<string> {
        const msgUint8 = new TextEncoder().encode(message);
        const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    }
}
