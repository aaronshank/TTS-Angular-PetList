import { Component, OnInit } from '@angular/core'
import { Pet } from '../pets'
import { PETS } from '../mock-pets'
import { PetService } from '../pet.service'

@Component( {
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: [ './pets.component.css' ]
} )
export class PetsComponent implements OnInit {

  pets : Pet[] = []

  selectedPet?: Pet

  constructor(private petService: PetService) { }

  ngOnInit(): void {
    this.getPets()
  }

  onSelect( pet: Pet ): void {
    this.selectedPet = pet
  }

  getPets(): void {
    this.petService.getPets()
      .subscribe(pets => this.pets = pets)
  }

}
