import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { SEARCH_TOOLBAR_SELECTOR } from "src/app/crossconcern/utilities/properties/selector.property";

@Component({
    selector: SEARCH_TOOLBAR_SELECTOR,
    templateUrl: "./searchtoolbar.component.html"
})
export class SearchToolbarComponent {
    @Output() public searchChange: EventEmitter<string> = new EventEmitter<string>();

    public searchControl = new FormControl();

    public sendSearchString(): void {
        this.searchChange.emit(this.searchControl.value ?? "");
    }

    public clear(): void {
        this.searchControl.setValue("");
        this.searchChange.emit("");
    }
}
