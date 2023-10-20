import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAppointmentsComponent } from './page-appointments.component';

describe('PageAppointmentsComponent', () => {
  let component: PageAppointmentsComponent;
  let fixture: ComponentFixture<PageAppointmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageAppointmentsComponent]
    });
    fixture = TestBed.createComponent(PageAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
