import { Component, inject, Input, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-card-details',
  imports: [],
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.scss'
})

export class CardDetailsComponent implements OnInit {

  @Input()pilotUrls: any[] = [];
  @Input()filmUrls: any[] = [];
  pilots: any[] = []; 
  films: any[] = [];

  private http = inject(HttpClient); 

  ngOnInit() {
    this.loadPilots();
    this.loadFilms();
  }

  loadPilots() {
    if (this.pilotUrls.length > 0) {
      forkJoin(this.pilotUrls.map(url => this.http.get(url))).subscribe(
        (pilotDataArray: any[]) => {
          this.pilots = pilotDataArray.map((pilot) => ({
            name: pilot.name,
            image: this.getPilotImageUrl(pilot.url),
          }));
        },
        (error) => {
          console.error('Error al cargar los pilotos:', error);
        }
      );
    }
  }
   
  
  loadFilms() {
    if (this.filmUrls.length > 0) {
      forkJoin(this.filmUrls.map(url => this.http.get(url))).subscribe(
        (filmDataArray: any[]) => {
          this.films = filmDataArray.map((film) => ({
            title: film.title,
            image: film.url
          }));
        },
        (error) => {
          console.error('Error al cargar de peliculas:', error);
        }
      );
    }
  }
  getFilmImageUrl(film: string): string {
    const id :string = film.split('/').filter((part: any) => part).pop() || ''; 
    console.log(id)
    return `imgFilms/${id}.jpeg`;
  }
  
  private getPilotImageUrl(url: string): string {
    const match = url.match(/\/(\d+)\/$/); // Extrae el ID del URL
    console.log(match);
    return match
      ? `https://raw.githubusercontent.com/vieraboschkova/swapi-gallery/refs/heads/main/static/assets/img/people/${match[1]}.jpg`
      : '';
  }
}