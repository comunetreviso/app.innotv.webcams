import { Injectable } from "@angular/core";
import { FilterModel } from "src/app/crossconcern/models/filter.model";

@Injectable()
export abstract class BaseRepositoryInterface {

    public abstract buildUrlQuery(
        baseUrl: string,
        searchString: string,
        filters: FilterModel[]
    ): string;
}
