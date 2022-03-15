import { Component, OnInit } from '@angular/core'
import { Pet } from '../pets'
import { PetService } from '../pet.service'
import { MessageService } from '../message.service'

@Component( {
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: [ './pets.component.css' ]
} )
export class PetsComponent implements OnInit {

  pets : Pet[] = []

  selectedPet?: Pet

  constructor(private petService: PetService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getPets()
  }

  onSelect( pet: Pet ): void {
    this.selectedPet = pet
    this.messageService.add(`PetComponent: Selected pet id=${pet.id}`)
  }

  getPets(): void {
    this.petService.getPets()
      .subscribe(pets => this.pets = pets)
  }

}
