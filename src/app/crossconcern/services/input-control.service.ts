import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { InputBase } from "../models/input-base";

@Injectable()
export class InputControlService {

    constructor() {
        // no content
    }

    toFormGroup(inputs: InputBase<string>[]): FormGroup {
        const group = {};

        inputs.forEach((input) => {
            group[input.key] = input.required ? new FormControl(input.value || "", Validators.required)
                : new FormControl(input.value || "");
        });
        return new FormGroup(group);
    }
}
