import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { LIST_SEARCH_SELECTOR } from "src/app/crossconcern/utilities/properties/selector.property";

@Component({
    selector: LIST_SEARCH_SELECTOR,
    templateUrl: "./listsearch.component.html"
})
export class ListSearchComponent {
    @Input() public entityName: string;
    @Output() public search: EventEmitter<string> = new EventEmitter<string>();

    public searchControl = new FormControl();

    public sendSearchString(): void {
        this.search.emit(this.searchControl.value ?? "");
    }

    public clear(): void {
        this.searchControl.setValue("");
        this.search.emit("");
    }
}
