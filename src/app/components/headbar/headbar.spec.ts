import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Headbar } from './headbar';

describe('Headbar', () => {
  let component: Headbar;
  let fixture: ComponentFixture<Headbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Headbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Headbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
