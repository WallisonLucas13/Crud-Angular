import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Navigation, Router } from '@angular/router';
import { map, catchError, first, delay } from 'rxjs';
import { Curso } from '../models/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoDetailsService {

  private API_PUT: string = "http://localhost:8080/Cursos/Edit";
  private param: HttpParams = new HttpParams();

  constructor(private route: Router, private http: HttpClient){

  }

  sendForm(nome: string, form: FormGroup){
    this.param = this.param.set('nome', nome);

    return this.http.put<Curso>(this.API_PUT, form.value, {params: this.param});
  }
}
