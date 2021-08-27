import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class UIService {

    public loadingObservable: Observable<boolean>;
    private loadingSubject: BehaviorSubject<boolean>;

    public loadingCounter = 0;

    constructor() {
        this.loadingSubject = new BehaviorSubject(false);
        this.loadingObservable = this.loadingSubject.asObservable();
    }

    public setLoading(status: boolean): void {
        if (status) {
            this.loadingCounter++;
            if (this.loadingCounter === 1) {
                this.updateLoader();
            }
        } else {
            this.loadingCounter--;
            if (this.loadingCounter <= 0) {
                this.loadingCounter = 0;
                this.updateLoader();
            }
        }
    }

    private updateLoader() {
        setTimeout(() => {
            this.loadingSubject.next(this.loadingCounter >= 1);
        });
    }
}
