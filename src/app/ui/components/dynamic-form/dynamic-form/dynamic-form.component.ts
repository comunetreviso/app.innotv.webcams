import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { InputBase } from "src/app/crossconcern/models/input-base";
import { InputControlService } from "src/app/crossconcern/services/input-control.service";

// see: https://angular.io/guide/dynamic-form#enable-reactive-forms-for-your-project
@Component({
    selector: "app-dynamic-form",
    templateUrl: "./dynamic-form.component.html",
    styleUrls: [
        "./dynamic-form.component.scss"
    ],
    providers: [
        InputControlService
    ]
})
export class DynamicFormComponent implements OnInit {

    @Input() inputs: InputBase<string>[] = [];
    form: FormGroup;
    payLoad = "";

    constructor(private inputControlService: InputControlService) { }

    ngOnInit(): void {
        this.form = this.inputControlService.toFormGroup(this.inputs);
    }

    onSubmit(): void {
        this.payLoad = JSON.stringify(this.form.getRawValue());
    }
}
