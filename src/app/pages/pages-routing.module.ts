import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';
import { CreateClienteComponent } from './components/clientes/create-cliente/create-cliente.component';
import { EditClienteComponent } from './components/clientes/edit-cliente/edit-cliente.component';
import { IndexClienteComponent } from './components/clientes/index-cliente/index-cliente.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: InicioComponent },
      {
        path: 'panel',
        children: [
          {
            path: 'clientes',
            component: IndexClienteComponent,
          },
          {
            path: 'clientes/registro',
            component: CreateClienteComponent,
          },
          {
            path: 'clientes/:id',
            component: EditClienteComponent,
          },
        ],
      },
    ],
  },

  /*   { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', redirectTo: '/', pathMatch: 'full' }, */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
