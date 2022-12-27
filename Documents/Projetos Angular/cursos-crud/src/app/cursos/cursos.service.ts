import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, of, timeout, timer } from 'rxjs';
import { Curso } from '../models/curso';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private API_GET: string = "http://localhost:8080/Cursos/Todos";
  private API_DELETE: string = "http://localhost:8080/Cursos/Delete";
  private param_delete: HttpParams = new HttpParams();

  constructor(private http: HttpClient) { }

  getRequest(){
    return this.http.get<Curso[]>(this.API_GET);
  }
  deleteRequest(nome: string){
    this.param_delete = this.param_delete.set('nome', nome);

    return this.http.delete<string>(this.API_DELETE, {params: this.param_delete});
  }

}
