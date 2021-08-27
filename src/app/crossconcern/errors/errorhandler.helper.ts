import { ErrorHandler, Injectable } from "@angular/core";
import { throwError } from "rxjs/internal/observable/throwError";
import { HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { logData, logError } from "../utilities/helpers/log.helper";

@Injectable()
export class ErrorHandlerHelper implements ErrorHandler {

    // TO-DO: handle ExpressionChangedAfterItHasBeenCheckedError to not make it show up in log
    public handleError(error: Error): Observable<never> {
        if (error instanceof HttpErrorResponse) {
            logError("http error response, check network logs");
            // return an observable with a user-facing error message
            return throwError(error);
        }
        logError("non-http error response:", error);
        // return an observable with a user-facing error message
        return throwError(error);
    }

    public showError(error: Error): void {
        if (error instanceof HttpErrorResponse) {
            this.handleHttpError(error);
        } else {
            this.handleLocalError(error);
        }
    }

    private handleHttpError(error: HttpErrorResponse): void {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            logData("An error occurred: " + error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            logData("Backend error: ");
            logData(error.error);
        }
    }

    private handleLocalError(error: Error): void {
        logData("local error " + error.message);
    }
}
