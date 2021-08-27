import { Injectable } from "@angular/core";
import { BaseManager } from "./base.manager";
import { Observable } from "rxjs";
import { WebcamRepositoryInterface } from "src/app/datastore/repositories/webcam/webcam.interface";
import { WebcamModel } from "src/app/datastore/entities/webcam.model";

@Injectable()
export class WebcamManager extends BaseManager {

    constructor(private webcamRepository: WebcamRepositoryInterface) {
        super();
    }

    public getWebcams(): Observable<WebcamModel[]> {
        return this.webcamRepository.getWebcams();
    }
}
