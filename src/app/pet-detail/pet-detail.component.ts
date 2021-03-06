import { Component, OnInit, Input } from '@angular/core'
import { Pet } from '../pets'
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'
import { PetService } from '../pet.service'

@Component( {
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.component.html',
  styleUrls: [ './pet-detail.component.css' ]
} )
export class PetDetailComponent implements OnInit {
  pet: Pet | undefined

  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getPet()
  }

  getPet(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.petService.getPet(id)
      .subscribe(pet => this.pet = pet)
  }

  goBack(): void {
    this.location.back()
  }

  save(): void {
    if (this.pet) {
      this.petService.updatePet(this.pet)
        .subscribe(() => this.goBack())
    }
  }
}
