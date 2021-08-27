import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { finalize } from "rxjs/operators";
import { ServiceManager } from "src/app/business/managers/service.manager";
import { ErrorHandlerHelper } from "src/app/crossconcern/errors/errorhandler.helper";
import { FilterModel } from "src/app/crossconcern/models/filter.model";
import { PositionModel } from "src/app/crossconcern/models/position.model";
import { UIService } from "src/app/crossconcern/services/ui.service";
import {
    MAP_PUBLIC_SERVICE_ICON, MAP_PUBLIC_SERVICE_ICON_OPACITY,
    MAP_SHOP_SERVICE_ICON,
    MAP_SHOP_SERVICE_ICON_OPACITY,
    MAP_STYLE,
    TREVISO_LATITUDE,
    TREVISO_LONGITUDE
} from "src/app/crossconcern/utilities/properties/base.property";
import { EQUALS_OPERATOR, TYPE_FILTER_NAME } from "src/app/crossconcern/utilities/properties/filter.property";
import { PUBLIC_SERVICES_SELECTOR } from "src/app/crossconcern/utilities/properties/selector.property";
import { ServiceModel } from "src/app/datastore/entities/service.model";
import {} from "google.maps";

@Component({
    selector: PUBLIC_SERVICES_SELECTOR,
    templateUrl: "./services.component.html"
})
export class PublicServicesComponent implements OnInit {
    public latitude = TREVISO_LATITUDE;
    public longitude = TREVISO_LONGITUDE;
    public searchString: string;
    public filters: FilterModel[] = [];
    public selectedService: ServiceModel;
    public services: ServiceModel[] = [];
    public collapsedService = true;
    public typeParam: string;
    public googleMap: google.maps.Map;
    public mapStyle: google.maps.MapTypeStyle[];
    public collapsedToolbar = false;

    constructor(
        private serviceManager: ServiceManager,
        private uiService: UIService,
        private route: ActivatedRoute,
        private errorHandlerHelper: ErrorHandlerHelper) {
        this.mapStyle = [];
        this.mapStyle.push(MAP_STYLE as google.maps.MapTypeStyle);
    }

    public ngOnInit(): void {
        this.route.queryParamMap.subscribe((paramMap) => {
            this.typeParam = paramMap.get("type");
            if (this.typeParam) {
                this.filters.push(new FilterModel(TYPE_FILTER_NAME, EQUALS_OPERATOR, this.typeParam));
            }
            this.getServices("", this.filters);
        });
    }

    public onMapReady(map: google.maps.Map): void {
        this.googleMap = map;
        this.setBounds();
        this.removeDefTooltips();
    }

    public onMapClick(): void {
        this.collapseServiceBox();
        this.removeDefTooltips();
    }

    public onMarkerClick(service: ServiceModel): void {
        this.changeMarkerColor(service);
        this.selectedService = service;
    }

    public isNotEmpty(field: string): boolean {
        return field !== null && field.length !== 0;
    }

    public showHideToolbar(): void {
        this.collapsedToolbar = !this.collapsedToolbar;
    }

    public expandServiceBox(): void {
        this.collapsedService = this.collapsedService !== true;
    }

    public collapseServiceBox(): void {
        this.collapsedService = true;
    }

    public seeDirections(selectedService: ServiceModel): void {
        const currentPosition = new PositionModel();
        const goalPosition = new PositionModel(selectedService.latitude, selectedService.longitude);
        const windowReference = window.open("about:blank", "_blank");
        navigator.geolocation.getCurrentPosition((position) => {
            currentPosition.longitude = position.coords.longitude;
            currentPosition.latitude = position.coords.latitude;

            const link = "http://maps.google.com/maps" +
                `?saddr=${currentPosition.latitude},${currentPosition.longitude}` +
                `&daddr=${goalPosition.latitude},${goalPosition.longitude}`;
            windowReference.location.href = link;
        }, () => {
            windowReference.close();
        });
    }

    public onSearchChange(searchString: string): void {
        this.searchString = searchString;
        this.selectedService = null;
        this.getServices(this.searchString, this.filters);
        this.changeMarkerColor(this.selectedService);
    }

    public onFilterChange(filters: FilterModel[]): void {
        this.filters = filters;
        this.route.queryParamMap.subscribe((paramMap) => {
            this.typeParam = paramMap.get("type");
            if (this.typeParam) {
                this.filters.push(new FilterModel(TYPE_FILTER_NAME, EQUALS_OPERATOR, this.typeParam));
            }
            this.selectedService = null;
            this.getServices(this.searchString, this.filters);
            this.changeMarkerColor(this.selectedService);
        });
    }

    private changeMarkerColor(serviceToChange: ServiceModel) {
        this.services.forEach((service) => {
            if (service.type === "shop") {
                service.icon = MAP_SHOP_SERVICE_ICON_OPACITY;
            } else {
                service.icon = MAP_PUBLIC_SERVICE_ICON_OPACITY;
            }
        });
        if (serviceToChange != null) {
            if (serviceToChange.type === "shop") {
                serviceToChange.icon = MAP_SHOP_SERVICE_ICON;
            } else {
                serviceToChange.icon = MAP_PUBLIC_SERVICE_ICON;
            }
        }
    }

    private getServices(searchString?: string, filters?: FilterModel[]): void {
        this.uiService.setLoading(true);
        this.serviceManager.getServices(searchString ?? "", filters ?? []).pipe(
            finalize(() => this.uiService.setLoading(false))
        ).subscribe((services) => {
            this.selectedService = null;
            this.services = services;
            this.setBounds();
        }, (error) => {
            this.errorHandlerHelper.handleError(error);
        });
    }

    private setBounds(): void {
        const bounds: google.maps.LatLngBounds = new google.maps.LatLngBounds();
        if (this.services.length > 0) {
            for (const service of this.services) {
                bounds.extend(new google.maps.LatLng(service.latitude, service.longitude));
            }
            this.googleMap.fitBounds(bounds);
        }
    }

    private removeDefTooltips(): void {
        setTimeout(() => {
            const tooltips = document.getElementsByClassName("gm-style-iw-a");
            for (let i = 0; i < tooltips.length; i++) {
                tooltips.item(i).remove();
            }
        }, 0);
    }
}
