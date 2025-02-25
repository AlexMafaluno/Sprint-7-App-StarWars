import { Component, inject, OnInit } from '@angular/core';
import { SpaceshipService } from '../services/spaceship.service';
import { CommonModule } from '@angular/common';
import { ShipCardComponent } from "../ship-card/ship-card.component";
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

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
  public paginaData: any;
  //private paginaSubscription: Subscription;

  constructor(){}

  async ngOnInit() {
    this.spaceships = await this.spaceshipService.getStarShips();
    console.log(this.spaceships)
  }

  loadMoreShips():void{
    this.spaceshipService.getStarShips().then((ships) => {
      this.spaceships = ships; // actualiza lista de aves
      console.log(this.spaceships)
    }).catch(error => {
      console.error("Error al cargar más naves:", error);
    });
    }
} 






