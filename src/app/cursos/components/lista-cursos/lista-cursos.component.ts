import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Curso } from 'src/app/models/curso';
import { CursoService } from 'src/app/cursos/services/curso.service';
import { Router } from '@angular/router';
import { CursoState } from 'src/app/models/curso.state';
import { Store } from '@ngrx/store';
import { loadCursossFailure, loadCursossSuccess } from '../../state/cursos.actions';
import { selectStateCargando, selectStateCursos } from '../../state/cursos.selectors';

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.css']
})
export class ListaCursosComponent implements OnInit {
  cursos$!: Observable<Curso[]>;
  cargando$!: Observable<boolean>;
  suscripcionCursos!: Subscription;

  constructor(
    private cursoService: CursoService,
    private router: Router,
    private store: Store<CursoState>
  ) {
    this.cursos$ = this.store.select(selectStateCursos); 
    this.cargando$ = this.store.select(selectStateCargando);
   }

  ngOnInit(): void {
    this.suscripcionCursos = this.cursoService.obtenerCursos().subscribe({
      next: (cursos: Curso[]) => {
        this.store.dispatch(loadCursossSuccess({cursos}));
      },
      error: (error: any) => {
        alert("Hubo un error")
        this.store.dispatch(loadCursossFailure(error));
      }
    });
  }

  ngOnDestroy(): void {
    console.log('El component lista-cursos se esta destruyendo');
    this.suscripcionCursos.unsubscribe();
  }

  eliminarCurso(id:number){
    this.cursoService.eliminarCurso(id);
    this.cursos$ = this.cursoService.obtenerCursos();
  }

  editarCurso(curso: Curso){
    this.router.navigate(['cursos/editar', curso])
  }
}