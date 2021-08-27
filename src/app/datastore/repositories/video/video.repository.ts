import { Injectable } from "@angular/core";
import { RemoteRepositoryInterface } from "../../remote/remote.interface";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { VideoRepositoryInterface } from "./video.interface";
import { VideoModel } from "../../entities/video.model";

@Injectable()
export class VideoRepository implements VideoRepositoryInterface {

    constructor(private remoteRepository: RemoteRepositoryInterface) {}

    public getVideos(searchString?: string): Observable<VideoModel[]> {
        return this.remoteRepository.get(!searchString ? "/video" : "/video?search=" + searchString).pipe(
            map((data: JSON[]) => {
                const items: VideoModel[] = [];
                for (const obj of data) {
                    items.push(new VideoModel(obj));
                }
                return items;
            })
        );
    }
}
