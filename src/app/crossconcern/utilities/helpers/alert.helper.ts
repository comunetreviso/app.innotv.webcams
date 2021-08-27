/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CategoryModel } from "src/app/datastore/entities/category.model";
import { CategoriesAlertComponent } from "src/app/ui/components/categoriesalert/categoriesalert.component";
import { GenericAlertComponent } from "src/app/ui/components/generic-alert/generic-alert.component";

@Injectable({
    providedIn: "root"
})
export class AlertHelper {
    constructor(private modalService: NgbModal) {}

    public showAlert(title: string, message: string): void {
        const modalRef = this.modalService.open(GenericAlertComponent);
        modalRef.componentInstance.title = title;
        modalRef.componentInstance.message = message;
    }

    public showCategoriesAlert(
        categories: CategoryModel[],
        selectedCategories: CategoryModel[],
        onConfirm: (result: { categories: CategoryModel[] }) => unknown): void {
        const modalRef = this.modalService.open(CategoriesAlertComponent);
        modalRef.componentInstance.categories = categories;
        modalRef.componentInstance.selectedCats = selectedCategories;

        void modalRef.result.then((result: { categories: CategoryModel[] }) => {
            onConfirm(result);
        });
    }

}
