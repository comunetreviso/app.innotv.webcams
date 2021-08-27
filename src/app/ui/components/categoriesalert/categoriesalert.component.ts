import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CATEGORIES_ALERT_SELECTOR } from "src/app/crossconcern/utilities/properties/selector.property";
import { CategoryModel } from "src/app/datastore/entities/category.model";

@Component({
    selector: CATEGORIES_ALERT_SELECTOR,
    templateUrl: "./categoriesalert.component.html"
})
export class CategoriesAlertComponent implements OnInit {
    @Input() categories: CategoryModel[] = [];
    @Input() selectedCats: CategoryModel[] = [];
    public selectedCategories: CategoryModel[] = [];

    constructor(public activeModal: NgbActiveModal) { }

    public ngOnInit(): void {
        this.selectedCategories = [
            ...this.selectedCats
        ];
    }

    public backdropClick(): void {
        this.activeModal.close({ categories: this.selectedCats });
    }

    public select(category: CategoryModel): void {
        if (!this.selectedCategories.includes(category)) {
            this.selectedCategories.push(category);
        } else {
            this.selectedCategories = this.selectedCategories.filter((cat) => cat.id !== category.id);
        }
    }

    public reset(): void {
        this.selectedCategories = [];
        this.activeModal.close({ categories: this.selectedCategories });
    }

    public filter(): void {
        if (this.selectedCategories.length > 0) {
            this.activeModal.close({ categories: this.selectedCategories });
        }
    }
}
