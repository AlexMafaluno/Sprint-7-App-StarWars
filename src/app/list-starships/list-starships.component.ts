import { Component, inject, OnInit } from '@angular/core';
import { SpaceshipService } from '../services/spaceship.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-starships',
  imports: [CommonModule],
  templateUrl: './list-starships.component.html',
  styleUrl: './list-starships.component.scss'
})
export class ListStarshipsComponent implements OnInit {
  
  private spaceshipService = inject(SpaceshipService);
  spaceships: any[] = [];

  constructor(){}

  async ngOnInit() {
    this.spaceships = await this.spaceshipService.getStarShips();
  }

}



