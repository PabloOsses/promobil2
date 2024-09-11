import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailPlacePage } from './detail-place.page';

describe('DetailPlacePage', () => {
  let component: DetailPlacePage;
  let fixture: ComponentFixture<DetailPlacePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPlacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
