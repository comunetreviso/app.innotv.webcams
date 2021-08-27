import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FilterModel } from "src/app/crossconcern/models/filter.model";
import { CategoryModel } from "../../entities/category.model";
import { ServiceModel } from "../../entities/service.model";

@Injectable()
export abstract class ServiceRepositoryInterface {

    public abstract getServices(searchString?: string, filters?: FilterModel[]): Observable<ServiceModel[]>;

    public abstract getCategories(): Observable<CategoryModel[]>;
}
