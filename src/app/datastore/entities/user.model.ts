export class UserModel {
    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public avatar: string;

    constructor(value: JSON) {
        const user: JSON = value["data"];
        this.id = user["id"];
        this.firstName = user["first_name"];
        this.lastName = user["last_name"];
        this.email = user["email"];
        this.avatar = user["avatar"];
    }
}
