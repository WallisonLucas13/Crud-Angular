import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Curso } from '../models/curso';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  private API: string = "http://localhost:8080/Cursos/New";

  constructor(private http: HttpClient) { }

  sendForm(form: FormGroup){
    return this.http.post<Curso>(this.API, form.value);
  }
}
