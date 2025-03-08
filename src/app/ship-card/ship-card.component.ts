import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpaceshipService } from '../services/spaceship.service';
import { CardDetailsComponent } from '../components/card-details/card-details.component';

@Component({
  selector: 'app-ship-card',
  imports: [CommonModule, CardDetailsComponent],
  templateUrl: './ship-card.component.html',
  styleUrl: './ship-card.component.scss',
})
export class ShipCardComponent implements OnInit {
  ship: any = null;

  private spaceshipService = inject(SpaceshipService);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.spaceshipService.getShipDetails(id).subscribe((ship) => {
        this.ship = ship;
      });
    }
  }

  getShipImageUrl(ship: any): string {
    const id: string = ship.image
      .split('/')
      .filter((part: any) => part)
      .pop();
    console.log(id);
    return `img/${id}.jpg`; 
  }
}
