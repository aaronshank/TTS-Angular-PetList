import { Component, OnInit, Input } from '@angular/core'
import { Pet } from '../pets'

@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.component.html',
  styleUrls: ['./pet-detail.component.css']
})
export class PetDetailComponent implements OnInit {

  @Input() pet? : Pet

  constructor() { }

  ngOnInit(): void {
  }

}
