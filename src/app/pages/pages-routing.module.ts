import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';
import { CreateClienteComponent } from './components/clientes/create-cliente/create-cliente.component';
import { EditClienteComponent } from './components/clientes/edit-cliente/edit-cliente.component';
import { IndexClienteComponent } from './components/clientes/index-cliente/index-cliente.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CreateProductoComponent } from './components/productos/create-producto/create-producto.component';
import { IndexProductoComponent } from './components/productos/index-producto/index-producto.component';
import { InventarioProductoComponent } from './components/productos/inventario-producto/inventario-producto.component';
import { UpdateProductComponent } from './components/productos/update-product/update-product.component';
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
          {
            path: 'productos',
            component: IndexProductoComponent,
          },
          {
            path: 'productos/registro',
            component: CreateProductoComponent,
          },
          {
            path: 'productos/:id',
            component: UpdateProductComponent,
          },
          {
            path: 'productos/inventario/:id',
            component: InventarioProductoComponent,
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
