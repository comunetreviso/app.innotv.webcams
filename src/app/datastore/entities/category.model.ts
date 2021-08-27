export class CategoryModel {
    public id: number;
    public name: string;

    constructor(value: JSON) {
        this.id = value["id"];
        this.name = value["name"];
    }
}
