import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CategoriesAlertComponent } from "./categoriesalert.component";

describe("CategoriesAlertComponent", () => {
    let component: CategoriesAlertComponent;
    let fixture: ComponentFixture<CategoriesAlertComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [
                CategoriesAlertComponent
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CategoriesAlertComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
