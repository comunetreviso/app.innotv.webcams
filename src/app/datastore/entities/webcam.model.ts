// eslint-disable-next-line no-shadow
export enum WEBCAM_TYPE {
    STREAMING = "youtube_streaming",
    FRAME = "image_frame"
}

export class WebcamModel {
    public name: string;
    public latitude: number;
    public longitude: number;
    public type: WEBCAM_TYPE;
    public url: string;
    public refreshIntervalSeconds: number;

    constructor(value: JSON) {
        this.name = value["name"];
        this.latitude = value["latitude"];
        this.longitude = value["longitude"];
        this.type = value["type"];
        this.url = value["url"];
        this.refreshIntervalSeconds = value["refresh_interval"];
    }
}
