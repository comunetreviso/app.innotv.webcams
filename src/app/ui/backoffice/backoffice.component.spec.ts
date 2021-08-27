import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BackofficeComponent } from "./backoffice.component";

/* eslint-disable @typescript-eslint/no-floating-promises */

describe("BackofficeComponent", () => {
    let component: BackofficeComponent;
    let fixture: ComponentFixture<BackofficeComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [
                BackofficeComponent
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BackofficeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
