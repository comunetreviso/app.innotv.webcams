import { Injectable } from "@angular/core";
import { RemoteRepositoryInterface } from "../../remote/remote.interface";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ServiceRepositoryInterface } from "./service.interface";
import { ServiceModel } from "../../entities/service.model";
import { CategoryModel } from "../../entities/category.model";
import { FilterModel } from "src/app/crossconcern/models/filter.model";
import { BaseRepository } from "../base/base.repository";

@Injectable()
export class ServiceRepository extends BaseRepository implements ServiceRepositoryInterface {

    constructor(private remoteRepository: RemoteRepositoryInterface) {
        super();
    }

    public getServices(searchString?: string, filters?: FilterModel[]): Observable<ServiceModel[]> {
        // eslint-disable-next-line array-bracket-newline
        const url = this.buildUrlQuery("/service", searchString, filters);
        return this.remoteRepository.get(url).pipe(
            map((data: JSON[]) => {
                const items: ServiceModel[] = [];
                for (const obj of data) {
                    items.push(new ServiceModel(obj));
                }
                return items;
            })
        );
    }

    public getCategories(): Observable<CategoryModel[]> {
        return this.remoteRepository.get("/category").pipe(
            map((data: JSON[]) => {
                const items: CategoryModel[] = [];
                for (const obj of data) {
                    items.push(new CategoryModel(obj));
                }
                return items;
            })
        );
    }
}
