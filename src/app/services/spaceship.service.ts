import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpaceshipService {

  private apiUrl: string = "https://swapi.dev/api/starships";
  
  private starships: any[] = [
    { id: 1, name: 'Pepito', model: 'Seo'},
    { id: 2, name:'Falcon', model: 'Ads'}
  ];


  constructor() { }

//metodo para obtener el listado de naves espaciales
  async getStarShips(): Promise<any> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error('Error en la respuesta de l\'API');
      }
      const data = await response.json();
      this.starships = data.results.map((ship:any, index: number) => ({
        id: index + 1,
        name:ship.name,
        model:ship.model,
        manufacturer:ship.manufacturer,
        costInCredits:ship.cost_in_credits,
        length:ship.length,
        maxAatmospheringSpeed: ship.max_atmosphering_speed,
        crew: ship.crew,
        image:ship.url

      }));
      return this.starships;
    } catch (error) {
      console.error('Ha habido un error:', error);
      throw error;
    }
  }

  getShipDetails(id: string) {
    return of(this.starships.find(ship => ship.id === Number(id))); // Simula una petición asíncrona con `of()`
  }

  }

