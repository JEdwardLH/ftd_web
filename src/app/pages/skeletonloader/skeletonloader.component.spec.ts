import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonloaderComponent } from './skeletonloader.component';

describe('SkeletonloaderComponent', () => {
  let component: SkeletonloaderComponent;
  let fixture: ComponentFixture<SkeletonloaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkeletonloaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeletonloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
