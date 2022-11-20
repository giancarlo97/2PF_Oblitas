import { createAction, props } from '@ngrx/store';
import { Curso } from 'src/app/models/curso';

export const loadCursoss = createAction(
  '[Cursos] Load Cursoss'
);

export const loadCursossSuccess = createAction(
  '[Cursos] Load Cursoss Success',
  props<{ cursos: Curso[] }>()
);

export const loadCursossFailure = createAction(
  '[Cursos] Load Cursoss Failure',
  props<{ error: any }>()
);