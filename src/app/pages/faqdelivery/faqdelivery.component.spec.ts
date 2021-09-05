import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqdeliveryComponent } from './faqdelivery.component';

describe('FaqdeliveryComponent', () => {
  let component: FaqdeliveryComponent;
  let fixture: ComponentFixture<FaqdeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqdeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqdeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
