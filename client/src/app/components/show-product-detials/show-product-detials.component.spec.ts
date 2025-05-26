import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProductDetialsComponent } from './show-product-detials.component';

describe('ShowProductDetialsComponent', () => {
  let component: ShowProductDetialsComponent;
  let fixture: ComponentFixture<ShowProductDetialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowProductDetialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowProductDetialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
