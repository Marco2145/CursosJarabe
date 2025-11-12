import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewMapPage } from './view-map.page';

describe('ViewMapPage', () => {
  let component: ViewMapPage;
  let fixture: ComponentFixture<ViewMapPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
