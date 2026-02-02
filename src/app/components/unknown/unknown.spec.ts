import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Unknown } from './unknown';

describe('Unknown', () => {
  let component: Unknown;
  let fixture: ComponentFixture<Unknown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Unknown]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Unknown);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
