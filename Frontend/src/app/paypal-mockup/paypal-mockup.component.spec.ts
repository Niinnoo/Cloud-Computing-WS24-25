import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypalMockupComponent } from './paypal-mockup.component';

describe('PaypalMockupComponent', () => {
  let component: PaypalMockupComponent;
  let fixture: ComponentFixture<PaypalMockupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaypalMockupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaypalMockupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
