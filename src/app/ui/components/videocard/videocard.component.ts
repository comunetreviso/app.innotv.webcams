import { Component, Input } from "@angular/core";
import { VIDEO_CARD_SELECTOR } from "src/app/crossconcern/utilities/properties/selector.property";
import { VideoModel } from "src/app/datastore/entities/video.model";

@Component({
    selector: VIDEO_CARD_SELECTOR,
    templateUrl: "./videocard.component.html"
})
export class VideoCardComponent {
    @Input() public video: VideoModel;
    @Input() public selected: boolean;
}
