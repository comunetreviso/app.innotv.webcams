import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ErrorHandlerHelper } from "../../crossconcern/errors/errorhandler.helper";
import { logData } from "../../crossconcern/utilities/helpers/log.helper";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private errorHandlerHelper: ErrorHandlerHelper) {}

    public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = "";
                    if (error.error instanceof ErrorEvent) {
                        // client-side error
                        errorMessage = "Error: " + error.error.message;
                    } else {
                        // server-side error
                        errorMessage = "Error Code: " + error.status.toString() + "\nMessage: " + error.message;
                        this.errorHandlerHelper.showError(error);
                    }
                    logData(errorMessage);
                    return throwError(errorMessage);
                })
            );
    }
}
