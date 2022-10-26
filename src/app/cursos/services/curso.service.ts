import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, filter, Subject } from 'rxjs';
import { Curso } from '../../models/curso';

@Injectable()
export class CursoService {
  private cursos: Curso[] = [
    {
      id:1,
      nombre: 'Angular',
      comision: '32320',
      profesor: 'Jesica',
      fechaInicio: new Date(2022, 1, 10),
      fechaFin: new Date(2022, 3, 20),
      inscripcionAbierta: true,
      imagen: 'https://parentesis.com/imagesPosts/coder00.jpg'
    },
    {
      id: 2,
      nombre: 'React',
      comision: '32320',
      profesor: 'Jesica',
      fechaInicio: new Date(2022, 5, 20),
      fechaFin: new Date(2022, 7, 1),
      inscripcionAbierta: true,
      imagen: 'https://parentesis.com/imagesPosts/coder00.jpg'
    },
    {
      id:3,
      nombre: 'Vue',
      comision: '32320',
      profesor: 'Jesica',
      fechaInicio: new Date(2022, 5 ,1),
      fechaFin: new Date(2022, 6, 30),
      inscripcionAbierta: false,
      imagen: 'https://parentesis.com/imagesPosts/coder00.jpg'
    }
  ];
  private cursosSubject: BehaviorSubject<Curso[]>;

  constructor() {
    this.cursosSubject = new BehaviorSubject<Curso[]>(this.cursos); 
   }

  obtenerCursos(): Observable<Curso[]>{
    return this.cursosSubject.asObservable();
  }

  obtenerCurso(id: number): Observable<Curso[]>{
    return this.obtenerCursos().pipe(
      map((cursos: Curso[]) => cursos.filter((curso: Curso) => curso.id === id))
    )
  }

  agregarCurso(curso: Curso){
    this.cursos.push(curso);
    this.cursosSubject.next(this.cursos);
  }
  editarCurso(curso: Curso){
    let indice = this.cursos.findIndex((c: Curso) => c.id === curso.id);

    if(indice > -1){
      this.cursos[indice] = curso;
    }
    this.cursosSubject.next(this.cursos);
  }

  eliminarCurso(id: number){
    let indice = this.cursos.findIndex((c:Curso) => c.id === id);

    if(indice > -1){
      this.cursos.splice(indice,1);
    }
    this.cursosSubject.next(this.cursos);
  }
}

