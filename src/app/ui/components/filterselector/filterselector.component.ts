import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { finalize } from "rxjs/operators";
import { ServiceManager } from "src/app/business/managers/service.manager";
import { ErrorHandlerHelper } from "src/app/crossconcern/errors/errorhandler.helper";
import { FilterModel } from "src/app/crossconcern/models/filter.model";
import { UIService } from "src/app/crossconcern/services/ui.service";
import { AlertHelper } from "src/app/crossconcern/utilities/helpers/alert.helper";
import {
    CATEGORY_FILTER_NAME,
    EQUALS_OPERATOR,
    TYPE_FILTER_NAME
} from "src/app/crossconcern/utilities/properties/filter.property";
import { FILTER_SELECTOR_SELECTOR } from "src/app/crossconcern/utilities/properties/selector.property";
import { CategoryModel } from "src/app/datastore/entities/category.model";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: FILTER_SELECTOR_SELECTOR,
    templateUrl: "./filterselector.component.html"
})
export class FilterSelectorComponent implements OnInit {
    @Output() public onFilterSelected: EventEmitter<FilterModel[]> = new EventEmitter<FilterModel[]>();

    public selectedCategories: CategoryModel[] = [];
    public categories: CategoryModel[] = [];
    public filters: FilterModel[] = [];
    public typeParam: string;

    constructor(
        private serviceManager: ServiceManager,
        private uiService: UIService,
        private alertHelper: AlertHelper,
        private route: ActivatedRoute,
        private errorHandlerHelper: ErrorHandlerHelper) {}

    public ngOnInit(): void {
        this.getCategories();
    }

    public openFiltersModal(): void {
        this.alertHelper.showCategoriesAlert(
            this.categories,
            this.selectedCategories,
            (result) => {
                if (result) {
                    const filters: FilterModel[] = [];
                    this.selectedCategories = result.categories;
                    if (result.categories) {
                        for (const category of result.categories) {
                            filters.push(
                                new FilterModel(CATEGORY_FILTER_NAME, EQUALS_OPERATOR, category.id.toString())
                            );
                        }
                    }
                    this.onFilterSelected.emit(filters);
                }
            }
        );
    }

    private getCategories(): void {
        this.uiService.setLoading(true);
        this.route.queryParamMap.subscribe((paramMap) => {
            this.typeParam = paramMap.get("type");
            if (this.typeParam) {
                this.filters.push(new FilterModel(TYPE_FILTER_NAME, EQUALS_OPERATOR, this.typeParam));
            }
            this.serviceManager.getServices("", this.filters).pipe(
                finalize(() => this.uiService.setLoading(false))
            ).subscribe((services) => {
                services.forEach((service) => {
                    service.categories.forEach((serviceCategory) => {
                        this.categories.push(serviceCategory);
                    });
                });
                this.categories = [
                    ...new Map(this.categories.map((item) =>
                        [
                            item.id, item
                        ])).values()
                ];
                this.categories = this.categories.sort((a, b) => a.name < b.name ? -1 : 1);
            }, (error) => {
                this.errorHandlerHelper.handleError(error);
            });
        });
    }
}
