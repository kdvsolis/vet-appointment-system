import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetAppointmentComponent } from './pet-appointment.component';

describe('PetAppointmentComponent', () => {
  let component: PetAppointmentComponent;
  let fixture: ComponentFixture<PetAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
