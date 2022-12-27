import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cursos-crud';

  constructor(private route: Router){

  }

  goHomePage(){
    this.route.navigateByUrl("");
  }
  goCadastroPage(){
    this.route.navigateByUrl('cadastro');
  }
  goCursosPage(){
    this.route.navigateByUrl("cursos");
  }
  goLoginPage(){
    this.route.navigateByUrl("user/login");
  }
}
