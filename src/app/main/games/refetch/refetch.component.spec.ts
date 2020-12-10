import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefetchComponent } from './refetch.component';

describe('RefetchComponent', () => {
  let component: RefetchComponent;
  let fixture: ComponentFixture<RefetchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefetchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefetchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
