import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaTeTiComponent } from './components/page/juegos/ta-te-ti/ta-te-ti.component';
import { HomeComponent } from './components/page/home/home.component';
import { LoginComponent } from './components/page/ingreso/login/login.component';
import { RegistroComponent } from './components/page/ingreso/registro/registro.component';
import { PageNotFoundComponent } from './components/page/page-not-found/page-not-found.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { PiedraPapelTijeraComponent } from './components/page/juegos/piedra-papel-tijera/piedra-papel-tijera.component';
import { MemotestComponent } from './components/page/juegos/memotest/memotest.component';



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
  {
    path: 'juegos',
    children: [
      { path: 'tateti', component: TaTeTiComponent },
      { path: 'piedra-papel-tijeras', component: PiedraPapelTijeraComponent },
      { path: 'memotes', component: MemotestComponent },
      
      { path: '**', component: PageNotFoundComponent },
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
