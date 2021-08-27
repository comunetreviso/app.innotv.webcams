export class FilterModel {
    public name: string;
    public operation: string;
    public value: string;

    constructor(
        name: string,
        operation: string,
        value: string
    ) {
        this.name = name;
        this.operation = operation;
        this.value = value;
    }

    public filterQueryString(): string {
        return this.name + this.operation + this.value;
    }
}