import {
    MAP_PUBLIC_SERVICE_ICON,
    MAP_SHOP_SERVICE_ICON
} from "../../crossconcern/utilities/properties/base.property";
import { CategoryModel } from "./category.model";

export class ServiceModel {
    public name: string;
    public latitude: number;
    public longitude: number;
    public businessName: string;
    public fiscalCode: string;
    public address: string;
    public openingTime: string;
    public phone: string;
    public email: string;
    public type: string;
    public icon;
    public categories: CategoryModel[] = [];

    constructor(value: JSON) {
        this.name = value["name"];
        this.latitude = value["latitude"];
        this.longitude = value["longitude"];
        this.businessName = value["business_name"];
        this.fiscalCode = value["fiscal_code"];
        this.address = value["address"];
        this.openingTime = value["opening_time"];
        this.phone = value["phone"];
        this.email = value["email"];
        this.type = value["type"];
        if (this.type === "shop") {
            this.icon = MAP_SHOP_SERVICE_ICON;
        } else {
            this.icon = MAP_PUBLIC_SERVICE_ICON;
        }
        if(value["categories"] && value["categories"].length) {
            this.categories = value["categories"].map((place) => new CategoryModel(place as JSON));
        }
    }
}
