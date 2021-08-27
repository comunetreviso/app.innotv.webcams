import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { InputBase } from "../models/input-base";
import { InputDropdown } from "../models/input-dropdown";
import { InputTextarea } from "../models/input-textarea";
import { InputTextbox } from "../models/input-textbox";

@Injectable()
export class InputSourceService {
    // TODO: this is a mockup, insert api calls to get form input fields
    getInputs(): Observable<InputBase<string>[]> {
        const inputs: InputBase<string>[] = [
            new InputDropdown({
                key: "brave",
                label: "Bravery Rating",
                options: [
                    { key: "solid", value: "Solid" },
                    { key: "great", value: "Great" },
                    { key: "good", value: "Good" },
                    { key: "unproven", value: "Unproven" }
                ],
                order: 3
            }),
            new InputTextbox({
                key: "firstName",
                label: "First name",
                value: "Bombasto",
                required: true,
                order: 1,
                type: "text"
            }),
            new InputTextbox({
                key: "emailAddress",
                label: "Email",
                type: "email",
                order: 2
            }),
            new InputTextarea({
                key: "description",
                label: "Description",
                type: "",
                order: 4
            })
        ];

        return of([
            ...inputs
        ].sort((a, b) => a.order - b.order));
    }
}
