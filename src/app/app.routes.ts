import { Routes } from '@angular/router';
import { ShipCardComponent } from './ship-card/ship-card.component';
import { ListStarshipsComponent } from './list-starships/list-starships.component';

export const routes: Routes = [
{ path: 'ships', component: ListStarshipsComponent },
{ path: 'ships/:id', component: ShipCardComponent },
{ path: '', redirectTo: '/ships', pathMatch: 'full' }
];
