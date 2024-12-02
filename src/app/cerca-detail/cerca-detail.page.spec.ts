import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CercaDetailPage } from './cerca-detail.page';

describe('CercaDetailPage', () => {
  let component: CercaDetailPage;
  let fixture: ComponentFixture<CercaDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CercaDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
