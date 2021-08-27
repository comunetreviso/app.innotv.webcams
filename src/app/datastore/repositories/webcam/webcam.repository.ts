import { Injectable } from "@angular/core";
import { RemoteRepositoryInterface } from "../../remote/remote.interface";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { WebcamModel } from "../../entities/webcam.model";
import { WebcamRepositoryInterface } from "./webcam.interface";

@Injectable()
export class WebcamRepository implements WebcamRepositoryInterface {

    constructor(private remoteRepository: RemoteRepositoryInterface) {}

    public getWebcams(): Observable<WebcamModel[]> {
        return this.remoteRepository.get("/webcam").pipe(
            map((data: JSON[]) => {
                const items: WebcamModel[] = [];
                for (const obj of data) {
                    items.push(new WebcamModel(obj));
                }
                return items;
            })
        );
    }
}
