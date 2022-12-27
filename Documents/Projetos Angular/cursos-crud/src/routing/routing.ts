import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CadastroComponent } from "src/app/cadastro/cadastro.component";
import { CursoDetailsComponent } from "src/app/curso-details/curso-details.component";
import { CursosComponent } from "src/app/cursos/cursos.component";
import { HomeComponent } from "src/app/home/home.component";

const ROUTES: Routes = [
    {path: '', component: HomeComponent},
    {path: 'cursos', component: CursosComponent},
    {path: 'cadastro', component: CadastroComponent},
    {path: 'curso/details/:nome',component: CursoDetailsComponent}
]

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(ROUTES);