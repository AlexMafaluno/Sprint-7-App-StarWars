import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpaceshipService {
 
  private apiUrl: string = `${environment.apiBaseUrl}/starships/`;

  private starships: any[] = [];
  private page: number = 1;

  constructor() {}

  async getStarShips(page: number = 1): Promise<any> {
    const url = `${this.apiUrl}?page=${this.page}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        console.warn("Error en la respuesta de l'API");
        return this.starships;
      }

      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        console.warn('No se encontraron más naves.');
        return this.starships;
      }

      const newShips = this.mapStarships(data.results);
      if (newShips.length > 0) {
        this.updateStarships(newShips);
      } else {
        console.warn('No se agregaron nuevas naves.');
      }
      return this.starships;
    } catch (error) {
      console.error('Ha habido un error:', error);
      throw error;
    }
  }

  private extractId(url: string): string {
    const parts = url.split('/').filter((part) => part);
    return parts[parts.length - 1];
  }

  getShipDetails(id: string) {
    return of(this.starships.find((ship) => ship.id === Number(id)));
  }

  private mapStarships(results: any[]): any[] {
    const lastId =
      this.starships.length > 0
        ? this.starships[this.starships.length - 1].id
        : 0;

    return results.map((ship: any, index: number) => ({
      id: lastId + index + 1,
      name: ship.name,
      model: ship.model,
      manufacturer: ship.manufacturer,
      costInCredits: ship.cost_in_credits,
      length: ship.length,
      maxAatmospheringSpeed: ship.max_atmosphering_speed,
      crew: ship.crew,
      image: this.extractId(ship.url),
      pilots: ship.pilots,
      films: ship.films,
    }));
  }

  public updateStarships(newShips: any[]): void {
    if (newShips.length === 0) {
      console.warn('No hay más naves disponibles.');
      return; // No incrementamos `this.page` si ya no hay más naves
    }
    this.starships = [...this.starships, ...newShips];
    this.page += 1;
    
  }
}
