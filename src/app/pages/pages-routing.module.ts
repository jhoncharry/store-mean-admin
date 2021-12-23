import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';
import { CreateClienteComponent } from './components/clientes/create-cliente/create-cliente.component';
import { EditClienteComponent } from './components/clientes/edit-cliente/edit-cliente.component';
import { IndexClienteComponent } from './components/clientes/index-cliente/index-cliente.component';
import { ConfigComponent } from './components/config/config.component';
import { CreateCuponComponent } from './components/cupones/create-cupon/create-cupon.component';
import { IndexCuponComponent } from './components/cupones/index-cupon/index-cupon.component';
import { UpdateCuponComponent } from './components/cupones/update-cupon/update-cupon.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CreateProductoComponent } from './components/productos/create-producto/create-producto.component';
import { GaleriaProductoComponent } from './components/productos/galeria-producto/galeria-producto.component';
import { IndexProductoComponent } from './components/productos/index-producto/index-producto.component';
import { InventarioProductoComponent } from './components/productos/inventario-producto/inventario-producto.component';
import { UpdateProductComponent } from './components/productos/update-product/update-product.component';
import { VariedadProductoComponent } from './components/productos/variedad-producto/variedad-producto.component';
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
          {
            path: 'productos/variedades/:id',
            component: VariedadProductoComponent,
          },
          {
            path: 'productos/galeria/:id',
            component: GaleriaProductoComponent,
          },
          {
            path: 'cupones/registro',
            component: CreateCuponComponent,
          },
          {
            path: 'cupones',
            component: IndexCuponComponent,
          },
          {
            path: 'cupones/:id',
            component: UpdateCuponComponent,
          },
          {
            path: 'configuraciones',
            component: ConfigComponent,
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
