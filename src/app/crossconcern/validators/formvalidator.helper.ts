/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";
import * as emailRegexSafe from "email-regex-safe";
export const EMAIL_REGEX = emailRegexSafe({ strict: true });

@Injectable()
export class FormValidator {

    public emailValidator(control: FormControl): { "invalidEmailAddress": boolean } {
        if (
            control.value != null
            && control.value.match(EMAIL_REGEX)) {
            return null;
        }
        return { "invalidEmailAddress": true };
    }

    public passwordValidator(control: FormControl): { "invalidPassword": boolean } {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.value != null && (control.value as string).length > 3) {
            return null;
        }
        return { "invalidPassword": true };
    }
}
