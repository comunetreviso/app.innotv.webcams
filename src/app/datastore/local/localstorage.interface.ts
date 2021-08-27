import { Injectable } from "@angular/core";

@Injectable()
export abstract class LocalStorageRepositoryInterface {

    public abstract getToken(): string;

    public abstract setToken(value: string): void;

    public abstract removeToken(): void;
}
