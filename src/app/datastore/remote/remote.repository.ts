import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { API_URL } from "../../crossconcern/utilities/properties/base.property";
import { RemoteRepositoryInterface } from "./remote.interface";
import { Observable } from "rxjs";
import { ErrorHandlerHelper } from "../../crossconcern/errors/errorhandler.helper";

@Injectable()
export class RemoteRepository implements RemoteRepositoryInterface {

    constructor(private http: HttpClient, private errorHandlerHelper: ErrorHandlerHelper) {
        this.http = http;
    }

    public get(url: string, headers?: HttpHeaders): Observable<unknown> {
        return this.http.get(API_URL + url, { headers }).pipe(
            catchError(this.errorHandlerHelper.handleError)
        );
    }

    public post(url: string, body: unknown, headers?: HttpHeaders): Observable<unknown> {
        return this.http.post(API_URL + url, body, { headers }).pipe(
            catchError(this.errorHandlerHelper.handleError)
        );
    }

    public put(url: string, body: unknown, headers?: HttpHeaders): Observable<unknown> {
        return this.http.put(API_URL + url, body, { headers }).pipe(
            catchError(this.errorHandlerHelper.handleError)
        );
    }

    public delete(url: string, headers?: HttpHeaders): Observable<unknown> {
        return this.http.delete(url, { headers }).pipe(
            catchError(this.errorHandlerHelper.handleError)
        );
    }
}
