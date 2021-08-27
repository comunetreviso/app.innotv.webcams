export class VideoModel {
    public title: string;
    public startDate: string;
    public description: string;
    public url: string;

    constructor(value: JSON) {
        this.title = value["title"];
        this.startDate = value["start_date"];
        this.description = value["description"];
        this.url = value["url"];
    }
}
