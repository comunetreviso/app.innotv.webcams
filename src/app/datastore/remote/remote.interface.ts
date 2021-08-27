import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export abstract class RemoteRepositoryInterface {

    public abstract get(url: string): Observable<unknown>;

    public abstract post(url: string, body: unknown): Observable<unknown>;

    public abstract put(url: string, body: unknown): Observable<unknown>;

    public abstract delete(url: string): Observable<unknown>;
}
