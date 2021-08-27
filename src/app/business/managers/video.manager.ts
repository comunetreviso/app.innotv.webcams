import { Injectable } from "@angular/core";
import { BaseManager } from "./base.manager";
import { Observable } from "rxjs";
import { VideoModel } from "src/app/datastore/entities/video.model";
import { VideoRepositoryInterface } from "src/app/datastore/repositories/video/video.interface";

@Injectable()
export class VideoManager extends BaseManager {

    constructor(private videoRepository: VideoRepositoryInterface) {
        super();
    }

    public getVideos(searchString?: string): Observable<VideoModel[]> {
        return this.videoRepository.getVideos(searchString ?? null);
    }
}
