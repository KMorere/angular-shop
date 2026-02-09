import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartNavbar } from './cart-navbar';

describe('CartNavbar', () => {
  let component: CartNavbar;
  let fixture: ComponentFixture<CartNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartNavbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartNavbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
