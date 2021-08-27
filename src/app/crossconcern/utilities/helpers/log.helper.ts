/* eslint-disable no-console */

import { LOGGING_ENABLED } from "../properties/base.property";

export function logData(message: unknown, body?: unknown): void {
    if (LOGGING_ENABLED) {
        if (body) {
            console.log(message, body);
        } else {
            console.log(message);
        }
    }
}

export function logError(message: unknown, body?: unknown): void {
    if (LOGGING_ENABLED) {
        if (body) {
            console.error(message, body);
        } else {
            console.error(message);
        }

    }
}
