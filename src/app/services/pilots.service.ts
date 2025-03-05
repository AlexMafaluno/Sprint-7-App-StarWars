import { Injectable } from '@angular/core';
import { Pilot } from '../interfaces/pilot';
import { SpaceshipService } from './spaceship.service';

@Injectable({
  providedIn: 'root',
})
export class PilotsService {
  static fetchPilots() {
    throw new Error('Method not implemented.');
  }
  private pilotUrl: string = 'https://swapi.dev/api/people';
  
  async fetchPilots(pilots: any): Promise<Pilot[]> {
    try {
      const response = await fetch(this.pilotUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error("Error en la respuesta de l'API");
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Ha habido un error:', error);
      throw error;
    }
  };
 
  transformPilots(data: any): Pilot[] {
    return data.results.map((pilot: any) => ({
      name: pilot.name,
      image: this.getPilotImageUrl(pilot.url)
    }));
  };
  
  private getPilotImageUrl(url: string): string {
    const match = url.match(/\/(\d+)\/$/); // Extrae el ID del URL
    return match
      ? `https://raw.githubusercontent.com/vieraboschkova/swapi-gallery/refs/heads/main/static/assets/img/people/${match[1]}.jpg`
      : '';
  }



  
}
