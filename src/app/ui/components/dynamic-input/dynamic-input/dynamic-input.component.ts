import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { InputBase } from "src/app/crossconcern/models/input-base";

@Component({
    selector: "app-dynamic-input",
    templateUrl: "./dynamic-input.component.html",
    styleUrls: [
        "./dynamic-input.component.scss"
    ]
})
export class DynamicInputComponent {
    @Input() input: InputBase<string>;
    @Input() form: FormGroup;

    get isValid(): boolean {
        return this.form.controls[this.input.key].valid;
    }
}
