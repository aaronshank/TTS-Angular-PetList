import { Component, OnInit } from '@angular/core'
import {Pet } from '../pets'
import { PETS } from '../mock-pets'

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {

  pets = PETS

  selectedPet?: Pet

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(pet: Pet): void {
    this.selectedPet = pet
  }

}
