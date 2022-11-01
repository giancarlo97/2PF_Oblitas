import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Sesion } from 'src/app/models/sesion';
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  sesionSubject!: BehaviorSubject<Sesion>;

  constructor() {
    const sesion : Sesion = {
      sesionActiva: false
    };
    this.sesionSubject = new BehaviorSubject(sesion)
   }

  login(usuario: Usuario){
    const sesion: Sesion = {
      sesionActiva: true,
      usuarioActivo: usuario
    
    }

    this.sesionSubject.next(sesion);
  }

  obtenerSesion(): Observable<Sesion>{
    return this.sesionSubject.asObservable();
  }
}
