import { Injectable } from "@angular/core";
import { BaseManager } from "./base.manager";
import { Observable } from "rxjs";
import { ServiceRepositoryInterface } from "src/app/datastore/repositories/service/service.interface";
import { ServiceModel } from "src/app/datastore/entities/service.model";
import { CategoryModel } from "src/app/datastore/entities/category.model";
import { FilterModel } from "src/app/crossconcern/models/filter.model";

@Injectable()
export class ServiceManager extends BaseManager {

    constructor(private serviceRepository: ServiceRepositoryInterface) {
        super();
    }

    public getServices(searchString?: string, filters?: FilterModel[]): Observable<ServiceModel[]> {
        return this.serviceRepository.getServices(searchString ?? null, filters ?? null);
    }

    public getCategories(): Observable<CategoryModel[]> {
        return this.serviceRepository.getCategories();
    }
}
