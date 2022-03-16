import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { AppComponent } from './app.component'
import { PetsComponent } from './pets/pets.component'
import { PetDetailComponent } from './pet-detail/pet-detail.component'
import { MessagesComponent } from './messages/messages.component'
import { AppRoutingModule } from './app-routing.module'
import { DashboardComponent } from './dashboard/dashboard.component'
import { HttpClientModule } from '@angular/common/http'
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'
import { InMemoryDataService } from './in-memory-data.service'
import { PetSearchComponent } from './pet-search/pet-search.component'

@NgModule( {
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  declarations: [
    AppComponent,
    PetsComponent,
    PetDetailComponent,
    MessagesComponent,
    DashboardComponent,
    PetSearchComponent
  ],
  bootstrap: [ AppComponent ]
} )
export class AppModule { }
