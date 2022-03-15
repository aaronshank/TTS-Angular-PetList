import { Injectable } from '@angular/core'
import { Pet } from './pets'
import { PETS } from './mock-pets'
import { Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PetService {

  getPets(): Observable<Pet[]> {
    const pets = of(PETS)
    return pets
  }

  constructor() { }
}
