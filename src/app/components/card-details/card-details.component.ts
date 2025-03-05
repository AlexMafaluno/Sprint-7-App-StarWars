import { Component, inject, Input, OnInit } from '@angular/core';
import { PilotsService } from '../../services/pilots.service';
import { SpaceshipService } from '../../services/spaceship.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-card-details',
  imports: [],
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.scss'
})

export class CardDetailsComponent implements OnInit {

  @Input()pilotUrls: any[] = [];
  pilots: any[] = []; // Aquí se almacenarán los datos de los pilotos

  private http = inject(HttpClient); // 👈 Usa `inject` en vez de constructor

  ngOnInit() {
    this.loadPilots();
  }

  loadPilots() {
    if (this.pilotUrls.length > 0) {
      // Usamos `forkJoin` para hacer todas las llamadas en paralelo
      forkJoin(this.pilotUrls.map(url => this.http.get(url))).subscribe(
        (pilotDataArray: any[]) => {
          // Transformamos los datos agregando la imagen desde GitHub
          this.pilots = pilotDataArray.map((pilot) => ({
            name: pilot.name,
            image: this.getPilotImageUrl(pilot.url), // Generamos la imagen con la URL correcta
          }));
        },
        (error) => {
          console.error('Error al cargar los pilotos:', error);
        }
      );
    }
  }
      
  private getPilotImageUrl(url: string): string {
    const match = url.match(/\/(\d+)\/$/); // Extrae el ID del URL
    console.log(match);
    return match
      ? `https://raw.githubusercontent.com/vieraboschkova/swapi-gallery/refs/heads/main/static/assets/img/people/${match[1]}.jpg`
      : '';
  }

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