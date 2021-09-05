import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqordersComponent } from './faqorders.component';

describe('FaqordersComponent', () => {
  let component: FaqordersComponent;
  let fixture: ComponentFixture<FaqordersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqordersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
