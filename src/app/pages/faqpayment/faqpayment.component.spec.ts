import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqpaymentComponent } from './faqpayment.component';

describe('FaqpaymentComponent', () => {
  let component: FaqpaymentComponent;
  let fixture: ComponentFixture<FaqpaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqpaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
