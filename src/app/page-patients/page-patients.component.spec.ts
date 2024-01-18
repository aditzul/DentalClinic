import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePatientsComponent } from './page-patients.component';

describe('PagePatientsComponent', () => {
  let component: PagePatientsComponent;
  let fixture: ComponentFixture<PagePatientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagePatientsComponent]
    });
    fixture = TestBed.createComponent(PagePatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
