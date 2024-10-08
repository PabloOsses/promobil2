import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CityMapPage } from './city-map.page';

describe('CityMapPage', () => {
  let component: CityMapPage;
  let fixture: ComponentFixture<CityMapPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CityMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
