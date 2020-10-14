import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PetInformationComponent } from './pet-information/pet-information.component';
import { PetAppointmentComponent } from './pet-appointment/pet-appointment.component';

const routes: Routes = [
  { path: '', redirectTo: '/pet-information', pathMatch: 'full' },
  { path: 'pet-information', component: PetInformationComponent},
  { path: 'pet-appointment/:id', component: PetAppointmentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
