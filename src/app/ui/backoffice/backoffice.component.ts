import { Component } from "@angular/core";
import { InputBase } from "src/app/crossconcern/models/input-base";
import { InputSourceService } from "src/app/crossconcern/services/input-source.service";

@Component({
    selector: "app-backoffice",
    templateUrl: "./backoffice.component.html",
    styleUrls: [
        "./backoffice.component.scss"
    ],
    providers: [
        InputSourceService
    ]
})
export class BackofficeComponent {
    // Table example
    rows = [
        { name: "Austin", gender: "Male", company: "Swimlane" },
        { name: "Dany", gender: "Male", company: "KFC" },
        { name: "Molly", gender: "Female", company: "Burger King" }
    ];

    columns = [
        { prop: "name" }, { name: "Gender" }, { name: "Company" }
    ];

    // Form example
    inputs: InputBase<unknown>[];

    constructor(service: InputSourceService) {
        service.getInputs().subscribe(
            (inputs) => {
                this.inputs = inputs;
            }
        );
    }
}
