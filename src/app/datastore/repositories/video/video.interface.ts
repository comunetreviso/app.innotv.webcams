import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { VideoModel } from "../../entities/video.model";

@Injectable()
export abstract class VideoRepositoryInterface {

    public abstract getVideos(searchString?: string): Observable<VideoModel[]>;
}
