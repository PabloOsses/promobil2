import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CercaFormPage } from './cerca-form.page';

describe('CercaFormPage', () => {
  let component: CercaFormPage;
  let fixture: ComponentFixture<CercaFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CercaFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
