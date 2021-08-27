export class PositionModel {
    public latitude: number;
    public longitude: number;

    constructor(
        latitude?: number,
        longitude?: number
    ) {
        this.latitude = latitude ?? 0;
        this.longitude = longitude ?? 0;
    }
}
