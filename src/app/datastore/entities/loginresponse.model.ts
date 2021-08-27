export class LoginResponseModel {
    public token: string;

    constructor(value: JSON) {
        this.token = value["token"];
    }
}
