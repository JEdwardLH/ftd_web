import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewtrackorderComponent } from './newtrackorder.component';

describe('NewtrackorderComponent', () => {
  let component: NewtrackorderComponent;
  let fixture: ComponentFixture<NewtrackorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewtrackorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewtrackorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
