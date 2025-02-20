import { Injectable } from '@angular/core';

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
      this.starships = data.results.map((ship:any) => ({
        name:ship.name,
        model:ship.model
      }));
      return this.starships;
    } catch (error) {
      console.error('Ha habido un error:', error);
      throw error;
    }
  }
}
