import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentUserRoleComponent } from './parent-user-role.component';

describe('ParentUserRoleComponent', () => {
  let component: ParentUserRoleComponent;
  let fixture: ComponentFixture<ParentUserRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentUserRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentUserRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
