import { Action, createReducer, on } from '@ngrx/store';
import { CursoState } from 'src/app/models/curso.state';
import * as CursosActions from './cursos.actions';

export const cursosFeatureKey = 'cursos';

export const estadoInicial: CursoState = {
  cargando: false,
  cursos: []
};

export const reducer = createReducer(
  estadoInicial,
  on(CursosActions.loadCursoss, (state) => {
    return {...state, cargando: true }
  }),
  on(CursosActions.loadCursossSuccess, (state, {cursos}) => {
    return {...state, cargando: false, cursos}
  }),
  on(CursosActions.loadCursossFailure, (state, {error}) => {
    return state
  }),
);