import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { Curso } from '../models/curso';
import { CadastroService } from './cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {

  form: FormGroup;
  loading_template: boolean = false;

  constructor(private service: CadastroService, private route: Router, private snack: MatSnackBar){
    this.form = new FormGroup({
      nome: new FormControl("", [Validators.required]),
      categoria: new FormControl("", [Validators.required])
    })
  }

  goCursosPage(){
    this.route.navigateByUrl("cursos");
  }

  submit(){

    if(this.form.get('nome')?.invalid || this.form.get('categoria')?.invalid){
        this.snack.open("Campos Vazios! Tente Novamente!", "Fail!")._dismissAfter(1500);
        return;
    }

    this.loading_template = true;

    this.service.sendForm(this.form).pipe(
      
      map(response => {
        this.snack.open("Curso Salvo com Sucesso!", "Sucess!")._dismissAfter(2000);
        this.form.reset(this.form);
      }),

      catchError(error => {
        this.snack.open("Curso Existente, Altere os campos!", "Fail!")._dismissAfter(2000);
        return of([]);
      })

    ).subscribe(response => { this.loading_template = false;});

  }

}
