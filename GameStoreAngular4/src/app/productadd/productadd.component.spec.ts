import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductaddComponent } from './productadd.component';

describe('ProductaddComponent', () => {
  let component: ProductaddComponent;
  let fixture: ComponentFixture<ProductaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
