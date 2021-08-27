import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: "generic-alert",
    templateUrl: "./generic-alert.component.html",
    styleUrls: [
        "./generic-alert.component.scss"
    ]
})
export class GenericAlertComponent implements OnInit {
    @Input() title;
    @Input() message;

    constructor(public activeModal: NgbActiveModal) { }

    ngOnInit(): void {
        // no content
    }

    closeModal(): void {
        this.activeModal.close();
    }
}
