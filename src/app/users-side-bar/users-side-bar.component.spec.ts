import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSideBarComponent } from './users-side-bar.component';

describe('UsersSideBarComponent', () => {
  let component: UsersSideBarComponent;
  let fixture: ComponentFixture<UsersSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersSideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
