import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { PetsComponent } from './pets/pets.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { PetDetailComponent } from './pet-detail/pet-detail.component'

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'pets', component: PetsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: PetDetailComponent },
]

@NgModule( {
  imports: [ RouterModule.forRoot( routes ) ],
  exports: [ RouterModule ]
} )
export class AppRoutingModule { }
