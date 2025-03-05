import { Component, inject, Input, OnInit } from '@angular/core';
import { PilotsService } from '../../services/pilots.service';
import { SpaceshipService } from '../../services/spaceship.service';

@Component({
  selector: 'app-card-details',
  imports: [],
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.scss'
})

export class CardDetailsComponent{

  @Input()pilots: any[] = [];
/*
  private pilotsService = inject(PilotsService);
private spaceshipService = inject(SpaceshipService);

  async ngOnInit() {
    if (!this.pilots || this.pilots.length === 0) { 
      await this.loadPilots(); // Solo cargar si el padre no envió datos
    }
  }

  async loadPilots() {
    try {
      const data = await this.pilotsService.fetchPilots(); // Assuming getPilotsData() fetches the required data
      this.pilots = this.pilotsService.transformPilots(data);
      console.log('Pilots loaded:', this.pilots);
    } catch (error) {
      console.error('Error loading pilots:', error);
    }
  }
*/
}