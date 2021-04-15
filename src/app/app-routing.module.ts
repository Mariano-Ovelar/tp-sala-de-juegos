import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegistroComponent } from './component/registro/registro.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { QuienSoyComponent } from './component/quien-soy/quien-soy.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'ingreso',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registro', component: RegistroComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ]
  },


  { path: 'quienSoy', component: QuienSoyComponent },

  /* { path: 'ingreso', loadChildren: () => import('./component/ingreso/ingreso.module').then(m => m.IngresoModule) },  */
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
