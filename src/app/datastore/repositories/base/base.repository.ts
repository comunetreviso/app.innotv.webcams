/* eslint-disable array-bracket-newline */
import { Injectable } from "@angular/core";
import { FilterModel } from "src/app/crossconcern/models/filter.model";
import { SEARCH_FILTER_NAME, EQUALS_OPERATOR } from "src/app/crossconcern/utilities/properties/filter.property";
import { BaseRepositoryInterface } from "./base.interface";

@Injectable()
export class BaseRepository implements BaseRepositoryInterface {

    public buildUrlQuery(
        baseUrl: string,
        searchString?: string,
        filters?: FilterModel[]
    ): string {
        const params: string[] = [];
        if (searchString) params.push(SEARCH_FILTER_NAME + EQUALS_OPERATOR + searchString);
        if (filters?.length > 0) {
            /**
             * FOR NOW IT ONLY CARES ABOUT CONCATENATING FILTERS WITH SAME NAME, CONSIDERING THE FIRST
             * OPERATOR PASSED
             */
            const filtersNameMapping: Map<string, FilterModel[]> = new Map<string, FilterModel[]>();
            for (const filter of filters) {
                if (filtersNameMapping.has(filter.name)) {
                    filtersNameMapping.set(filter.name, [...filtersNameMapping.get(filter.name), filter]);
                } else {
                    filtersNameMapping.set(filter.name, [filter]);
                }
            }
            filtersNameMapping.forEach((mappedFilters) => {
                let singleParam: string;
                // eslint-disable-next-line @typescript-eslint/prefer-for-of
                for (let i = 0; i < mappedFilters.length; i++) {
                    if (i === 0) {
                        singleParam = mappedFilters[i].filterQueryString();
                    } else {
                        singleParam += "," + mappedFilters[i].value;
                    }
                }
                params.push(singleParam);
            });
        }
        if (params.length > 0) return baseUrl + "?" + params.join("&");
        return baseUrl;
    }
}
