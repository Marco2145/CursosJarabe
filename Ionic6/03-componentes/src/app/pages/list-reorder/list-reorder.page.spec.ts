import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListReorderPage } from './list-reorder.page';

describe('ListReorderPage', () => {
  let component: ListReorderPage;
  let fixture: ComponentFixture<ListReorderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReorderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
