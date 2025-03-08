import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

 /* private httpClient = inject(HttpClient);
  private baseUrl : string;
  constructor() {
    this.baseUrl= 'http://localhost:4200/api/users';
   }

   //creada la petición de registro desd el front para mandarla al back
   //una evz la tengo la peudo usar en el componente
   register(formValue: any){
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/register`,formValue)
    )
  }
    */
}
