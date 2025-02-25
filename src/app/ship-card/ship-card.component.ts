import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpaceshipService } from '../services/spaceship.service';

@Component({
  selector: 'app-ship-card',
  imports: [CommonModule],
  templateUrl: './ship-card.component.html',
  styleUrl: './ship-card.component.scss'
})
export class ShipCardComponent implements OnInit {
  
ship: any = null;
private spaceshipService = inject(SpaceshipService);
//@Input() shipCard: any;
//@Output() close = new EventEmitter<void>();

constructor(private route: ActivatedRoute){}

ngOnInit(): void {
  const id: string | null = this.route.snapshot.paramMap.get('id');  // Obtener el id de la URL
  if (id) {
    this.spaceshipService.getShipDetails(id).subscribe(ship => {
      this.ship = ship;
    });  // Obtener los detalles de la nave
  }
}

getShipImageUrl(ship: any): string {
  //if (!ship.url) return 'assets/img/default.jpg'; // Imagen por defecto si no hay URL

  // Extrae el ID desde la URL de la API (Ej: "https://swapi.dev/api/starships/2/")
  const id :string = ship.image.split('/').filter((part: any) => part).pop(); 
  console.log(id)
  return `img/${id}.jpg`; // Retorna la ruta de la imagen local
}

}
