import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideWarComponent } from './side-war.component';

describe('SideWarComponent', () => {
  let component: SideWarComponent;
  let fixture: ComponentFixture<SideWarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideWarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideWarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
