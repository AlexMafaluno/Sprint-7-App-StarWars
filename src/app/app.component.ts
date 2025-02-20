import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListStarshipsComponent } from './list-starships/list-starships.component';
@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, ListStarshipsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'StarWars_app';
}
