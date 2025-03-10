import { Component, inject, OnInit } from '@angular/core';
import { SpaceshipService } from '../services/spaceship.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-starships',
  imports: [CommonModule, RouterModule],
  templateUrl: './list-starships.component.html',
  styleUrl: './list-starships.component.scss',
})
export class ListStarshipsComponent implements OnInit {
  private spaceshipService = inject(SpaceshipService);
  spaceships: any[] = [];
  selectedShip: any = null;
  public paginaData: any;
 

  constructor() {}

  async ngOnInit() {
    this.spaceships = await this.spaceshipService.getStarShips();
  }

  loadMoreShips(): void {
    this.spaceshipService
      .getStarShips()
      .then((ships) => {
        this.spaceships = ships;
      })
      .catch((error) => {
        console.error('Error al cargar más naves:', error);
      });
  }
}
