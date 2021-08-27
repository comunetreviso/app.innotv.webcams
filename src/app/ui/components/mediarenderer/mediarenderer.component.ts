import { Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";
import { DomSanitizer, SafeResourceUrl, SafeUrl } from "@angular/platform-browser";
import { MEDIA_RENDERER_SELECTOR } from "src/app/crossconcern/utilities/properties/selector.property";
import { VideoModel } from "src/app/datastore/entities/video.model";
import { WebcamModel, WEBCAM_TYPE } from "src/app/datastore/entities/webcam.model";

@Component({
    selector: MEDIA_RENDERER_SELECTOR,
    templateUrl: "./mediarenderer.component.html"
})
export class MediaRendererComponent implements OnChanges {
    @Input() public entity: VideoModel | WebcamModel;
    @Output() public onEntityRemoved: EventEmitter<void> = new EventEmitter<void>();

    public sanitizedUrl: SafeResourceUrl | SafeUrl;
    public isVideo: boolean;
    public interval: NodeJS.Timeout;

    constructor(private sanitizer: DomSanitizer) {}

    public ngOnChanges(): void {
        if (!this.entity) {
            if (this.interval) clearInterval(this.interval);
            return;
        }

        this.isVideo =
            this.entity instanceof VideoModel ||
            (this.entity instanceof WebcamModel && this.entity.type === WEBCAM_TYPE.STREAMING);

        if (this.isVideo) {
            const parsedUrl = "https://www.youtube.com/embed/" + this.youtubeParsedId(this.entity.url);
            this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(parsedUrl);
            if (this.interval) clearInterval(this.interval);
        } else {
            this.sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(this.entity.url);
            const refreshMillis = (this.entity as WebcamModel).refreshIntervalSeconds * 1000;
            this.interval = setInterval(() => this.refreshWebcam(), refreshMillis);
        }
    }

    public removeEntity(): void {
        if (this.interval) clearInterval(this.interval);
        this.onEntityRemoved.emit();
    }

    private refreshWebcam(): void {
        this.sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(this.entity?.url);
    }

    private youtubeParsedId(url: string): string {
        const regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;
        const match = regExp.exec(url);
        return (match && match[1].length === 11) ? match[1] : null;
    }
}
