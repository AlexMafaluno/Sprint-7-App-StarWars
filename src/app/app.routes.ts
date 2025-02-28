import { Routes } from '@angular/router';
import { ShipCardComponent } from './ship-card/ship-card.component';
import { ListStarshipsComponent } from './list-starships/list-starships.component';
import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ships', component: ListStarshipsComponent },
  { path: 'ships/:id', component: ShipCardComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/' } // Redirige a Home si la ruta no existe
];
