import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CercaDeMiPage } from './cerca-de-mi.page';

describe('CercaDeMiPage', () => {
  let component: CercaDeMiPage;
  let fixture: ComponentFixture<CercaDeMiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CercaDeMiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
