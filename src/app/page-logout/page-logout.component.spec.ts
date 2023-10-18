import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLogoutComponent } from './page-logout.component';

describe('PageLogoutComponent', () => {
  let component: PageLogoutComponent;
  let fixture: ComponentFixture<PageLogoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageLogoutComponent]
    });
    fixture = TestBed.createComponent(PageLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
