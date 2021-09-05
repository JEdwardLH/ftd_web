import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadnowComponent } from './downloadnow.component';

describe('DownloadnowComponent', () => {
  let component: DownloadnowComponent;
  let fixture: ComponentFixture<DownloadnowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadnowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadnowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
