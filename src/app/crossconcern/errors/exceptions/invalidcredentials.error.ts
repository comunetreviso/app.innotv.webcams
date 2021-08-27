import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class InvalidCredentialsError extends Error {
    constructor() {
        super("ERROR_INVALID_CREDENTIALS");
        this.name = "ERROR_INVALID_CREDENTIALS";
    }
}
