import { Routes } from '@angular/router';
import { ShipCardComponent } from './ship-card/ship-card.component';
import { ListStarshipsComponent } from './list-starships/list-starships.component';
import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '', component: ListStarshipsComponent },
  { path: 'ships', component: ListStarshipsComponent },
  { path: 'ships/:id', component: ShipCardComponent },
  { path: '**', redirectTo: '/' }, // Redirige a Home si la ruta no existe
];
