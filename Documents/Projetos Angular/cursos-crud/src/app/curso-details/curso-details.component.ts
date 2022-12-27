import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, first, map, Observable, of, pipe } from 'rxjs';
import { Curso } from '../models/curso';
import { CursoDetailsService } from './curso-details.service';

@Component({
  selector: 'app-curso-details',
  templateUrl: './curso-details.component.html',
  styleUrls: ['./curso-details.component.scss']
})
export class CursoDetailsComponent {

  form: FormGroup;
  categoriaCurso: string;
  nomeCurso: string;

  constructor(private service: CursoDetailsService, private route: Router, private snack: MatSnackBar){
    
    const nav = route.getCurrentNavigation();
    this.nomeCurso = nav?.extras.state?.['nome'];
    this.categoriaCurso = nav?.extras.state?.['categoria'];

    this.form = new FormGroup({
      nome: new FormControl(this.nomeCurso, [Validators.required]),
      categoria: new FormControl(this.categoriaCurso, [Validators.required])
    });
  }

  goCursosPage(){
    this.route.navigateByUrl("cursos");
  }

  submit(){

      if(this.form?.get('nome')?.invalid || this.form?.get('categoria')?.invalid){
        this.snack.open("Campos Vazios! Tente Novamente!", "Fail!")._dismissAfter(1500);
        return;
      }
  
      this.service.sendForm(this.nomeCurso, this.form).pipe(
        map(response => {
          this.snack.open("Curso Editado com Sucesso!", "Sucess!")._dismissAfter(2000);
          this.form.reset(this.form);
        }),

        catchError(error => {

          if(error.status == 400){
            this.snack.open("Curso Existente, Altere os campos!", "Fail!")._dismissAfter(2000);
          }
          return of([]);
        })
      ).subscribe(res => {});
    }
}
