import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DplayImagenPage } from './dplay-imagen.page';

describe('DplayImagenPage', () => {
  let component: DplayImagenPage;
  let fixture: ComponentFixture<DplayImagenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DplayImagenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
