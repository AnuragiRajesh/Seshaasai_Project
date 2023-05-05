import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentRoleComponent } from './parent-role.component';

describe('ParentRoleComponent', () => {
  let component: ParentRoleComponent;
  let fixture: ComponentFixture<ParentRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
