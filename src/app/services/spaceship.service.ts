import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpaceshipService {

  private apiUrl: string = "https://swapi.dev/api/starships/";
  
  private starships: any[] = [];
  private page: number = 1; // Página actual

  constructor() { }

//metodo para obtener el listado de naves espaciales
  async getStarShips(): Promise<any> {
    const url = `${this.apiUrl}?page=${this.page}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error('Error en la respuesta de l\'API');
      }
      const data = await response.json();
      // Obtener el último ID en la lista actual o empezar desde 0
      const lastId = this.starships.length > 0 ? this.starships[this.starships.length - 1].id : 0;

      const newShips = data.results.map((ship:any, index: number) => ({
        id:lastId + index + 1,
        name:ship.name,
        model:ship.model,
        manufacturer:ship.manufacturer,
        costInCredits:ship.cost_in_credits,
        length:ship.length,
        maxAatmospheringSpeed: ship.max_atmosphering_speed,
        crew: ship.crew,
        image:this.extractId(ship.url),
        pilots:ship.pilots,
        films:ship.films,
      }));
      this.starships = [...this.starships, ...newShips]; // Agregar nuevas naves
      this.page += 1;
      return this.starships;
    } catch (error) {
      console.error('Ha habido un error:', error);
      throw error;
    }
  }

   // Extraer ID de la URL de la imagen
   private extractId(url: string): string {
    const parts = url.split('/').filter(part => part);
    console.log(parts)
    console.log(parts[parts.length - 1]);
    return parts[parts.length - 1]; // Extrae el último segmento (el ID)
  }

  getShipDetails(id: string) {
    return of(this.starships.find(ship => ship.id === Number(id))); // Simula una petición asíncrona con `of()`
  }
/*
  fetchPage() {
    this.http.get(this.apiUrl).subscribe(response => {
      this.page.set(response)
    })
  }
*/
  }

  /*
  Problemas Actuales:
  Hace una petición a la API (fetch).
  Transforma los datos de la API (map para cambiar el formato).
  Genera IDs personalizados (id: lastId + index + 1).
  Actualiza el estado del array this.starships.
  Incrementa la página (this.page += 1).
  👉 Esto hace que la función tenga demasiadas responsabilidades.
  */