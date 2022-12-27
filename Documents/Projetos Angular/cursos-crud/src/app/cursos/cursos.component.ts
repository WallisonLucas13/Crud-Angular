import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { Curso } from '../models/curso';
import { CursosService } from './cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent {

  cursos$: Observable<Curso[]>;
  
  constructor(private service: CursosService, private route: Router, private snack: MatSnackBar){
    this.cursos$ = service.getRequest().pipe(
      catchError(error => {
        this.snack.open("Servidor Indisponível, Tente Novamente!", "Fail!")._dismissAfter(3000);
        return of([]);
      })
    );
  }

  goHomePage(){
    this.route.navigateByUrl('');
  }
  goCadastroPage(){
    this.route.navigateByUrl('cadastro');
  }
  goEditPage(nome: string, categoria: string){
    this.route.navigateByUrl('curso/details/', {
      state: {
        nome: nome,
        categoria: categoria
      }
    })
  }

  deleteCurso(nome: string){
    this.service.deleteRequest(nome).pipe(

      map(response => {
        console.log(response);
        this.snack.open("Curso Apagado!", "Sucess!")._dismissAfter(1000);
        setTimeout(() => {location.reload()}, 1200);
      }),

      catchError(error => {
        this.snack.open("Erro! Tente Novamente mais tarde!", "Fail!")._dismissAfter(2000);
        return of([]);
      })
    ).subscribe(res => {});
  }

  displayedColumns: string[] = ['nome', 'categoria', 'edit', 'delete'];

}
