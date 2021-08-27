import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { WebcamModel } from "../../entities/webcam.model";

@Injectable()
export abstract class WebcamRepositoryInterface {

    public abstract getWebcams(): Observable<WebcamModel[]>;
}
