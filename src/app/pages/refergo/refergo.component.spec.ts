import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferGoComponent } from './refergo.component';

describe('ReferGoComponent', () => {
  let component: ReferGoComponent;
  let fixture: ComponentFixture<ReferGoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferGoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferGoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
