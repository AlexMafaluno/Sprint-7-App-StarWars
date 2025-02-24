import { Component, inject, OnInit } from '@angular/core';
import { SpaceshipService } from '../services/spaceship.service';
import { CommonModule } from '@angular/common';
import { ShipCardComponent } from "../ship-card/ship-card.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-starships',
  imports: [CommonModule, RouterModule],
  templateUrl: './list-starships.component.html',
  styleUrl: './list-starships.component.scss'
})
export class ListStarshipsComponent implements OnInit {
  
  private spaceshipService = inject(SpaceshipService);
  spaceships: any[] = [];
  selectedShip: any = null;
  
  constructor(){}

  async ngOnInit() {
    this.spaceships = await this.spaceshipService.getStarShips();
    console.log(this.spaceships)
  }
  
  selectShip(ship: any) {
    this.selectedShip = ship;
  }

  closeCard() {
    this.selectedShip = null;
  }
}



