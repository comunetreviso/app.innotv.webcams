import { Component, OnInit } from "@angular/core";
import { finalize } from "rxjs/operators";
import { VideoManager } from "src/app/business/managers/video.manager";
import { ErrorHandlerHelper } from "src/app/crossconcern/errors/errorhandler.helper";
import { UIService } from "src/app/crossconcern/services/ui.service";
import { PUBLIC_VIDEO_LIST_SELECTOR } from "src/app/crossconcern/utilities/properties/selector.property";
import { VideoModel } from "src/app/datastore/entities/video.model";

@Component({
    selector: PUBLIC_VIDEO_LIST_SELECTOR,
    templateUrl: "./videolist.component.html"
})
export class PublicVideoListComponent implements OnInit {
    public videos: VideoModel[] = [];
    public selectedVideo: VideoModel;
    public collapsed = true;

    constructor(
        private videoManager: VideoManager,
        private uiService: UIService,
        private errorHandlerHelper: ErrorHandlerHelper) {}

    public ngOnInit(): void {
        this.getVideos();
    }

    public getVideos(searchString?: string): void {
        this.uiService.setLoading(true);
        this.videoManager.getVideos(searchString).pipe(
            finalize(() => this.uiService.setLoading(false))
        ).subscribe((videos) => {
            this.videos = videos;
        }, (error) => {
            this.errorHandlerHelper.handleError(error);
        });
    }

    public seeIframe(video: VideoModel): void {
        this.selectedVideo = video;
    }

    public removeSelected(): void {
        this.selectedVideo = null;
        this.collapsed = true;
    }

    public collapse(): void {
        this.collapsed = !this.collapsed;
    }
}
