import { Injectable } from "@angular/core";
import { LOCAL_STORAGE_TOKEN } from "../../crossconcern/utilities/properties/localstorage.property";
import { LocalStorageRepositoryInterface } from "./localstorage.interface";

@Injectable()
export class LocalStorageRepository implements LocalStorageRepositoryInterface {

    public getToken(): string {
        return localStorage.getItem(LOCAL_STORAGE_TOKEN);
    }

    public setToken(value: string): void {
        localStorage.setItem(LOCAL_STORAGE_TOKEN, value);
    }

    public removeToken(): void {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN);
    }
}
