import { AgmMarker } from "@agm/core";
import { AfterViewInit, Component, ElementRef, OnInit, ViewEncapsulation } from "@angular/core";
import { finalize } from "rxjs/operators";
import { WebcamManager } from "src/app/business/managers/webcam.manager";
import { ErrorHandlerHelper } from "src/app/crossconcern/errors/errorhandler.helper";
import { UIService } from "src/app/crossconcern/services/ui.service";
import { TREVISO_LATITUDE, TREVISO_LONGITUDE } from "src/app/crossconcern/utilities/properties/base.property";
import { PUBLIC_WEBCAM_LIST_SELECTOR } from "src/app/crossconcern/utilities/properties/selector.property";
import { WebcamModel } from "src/app/datastore/entities/webcam.model";

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: PUBLIC_WEBCAM_LIST_SELECTOR,
    templateUrl: "./webcamlist.component.html",
    styleUrls: [
        "./webcamlist.scss"
    ]
})
export class PublicWebcamListComponent implements OnInit, AfterViewInit {
    public latitude = TREVISO_LATITUDE;
    public longitude = TREVISO_LONGITUDE;
    public webcams: WebcamModel[] = [];

    public selectedWebcam: WebcamModel;
    public selectedMarker: AgmMarker;
    public destroyed: boolean;
    public googleMap: google.maps.Map;
    public webcamMarker = {
        url: "assets/svgicons/webcam_pin.svg",
        scaledSize: {
            height: 40,
            width: 40
        },
        anchor: {
            x: 20,
            y: 20
        }
    };

    constructor(
        private webcamManager: WebcamManager,
        private uiService: UIService,
        private errorHandlerHelper: ErrorHandlerHelper,
        private elementRef: ElementRef) {}

    public ngOnInit(): void {
        this.getWebcams();
    }

    public ngAfterViewInit(): void {
        const portraitWidth = window.matchMedia("(orientation: portrait)").matches ?
            window.screen.width : window.screen.height;
        (this.elementRef.nativeElement as HTMLElement).style.setProperty(
            "--portrait-width",
            `${portraitWidth}px`
        );
    }

    public onMapReady(map: google.maps.Map): void {
        this.googleMap = map;
        this.setBounds();
    }

    public getWebcams(): void {
        this.uiService.setLoading(true);
        this.webcamManager.getWebcams().pipe(
            finalize(() => this.uiService.setLoading(false))
        ).subscribe((webcams) => {
            this.webcams = webcams;
            this.setBounds();
        }, (error) => {
            this.errorHandlerHelper.handleError(error);
        });
    }

    public removeSelected(): void {
        this.selectedWebcam = null;
    }

    public onMarkerClick(marker: AgmMarker, webcam: WebcamModel): void {
        this.selectedMarker = marker;
        this.selectedWebcam = webcam;
        this.destroyed = false;
    }

    public destroy(): void {
        this.destroyed = true;
    }

    private setBounds(): void {
        const bounds: google.maps.LatLngBounds = new google.maps.LatLngBounds();
        if (this.webcams.length > 0) {
            for (const webcam of this.webcams) {
                bounds.extend(new google.maps.LatLng(webcam.latitude, webcam.longitude));
            }
            this.googleMap.fitBounds(bounds);
        }
    }

}
