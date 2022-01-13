import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';
import { CreateClienteComponent } from './components/clientes/create-cliente/create-cliente.component';
import { EditClienteComponent } from './components/clientes/edit-cliente/edit-cliente.component';
import { IndexClienteComponent } from './components/clientes/index-cliente/index-cliente.component';
import { ConfigComponent } from './components/config/config.component';
import { IndexContactoComponent } from './components/contacto/index-contacto/index-contacto.component';
import { CreateCuponComponent } from './components/cupones/create-cupon/create-cupon.component';
import { IndexCuponComponent } from './components/cupones/index-cupon/index-cupon.component';
import { UpdateCuponComponent } from './components/cupones/update-cupon/update-cupon.component';
import { CreateDescuentoComponent } from './components/descuento/create-descuento/create-descuento.component';
import { EditDescuentoComponent } from './components/descuento/edit-descuento/edit-descuento.component';
import { IndexDescuentoComponent } from './components/descuento/index-descuento/index-descuento.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CreateProductoComponent } from './components/productos/create-producto/create-producto.component';
import { GaleriaProductoComponent } from './components/productos/galeria-producto/galeria-producto.component';
import { IndexProductoComponent } from './components/productos/index-producto/index-producto.component';
import { InventarioProductoComponent } from './components/productos/inventario-producto/inventario-producto.component';
import { ReviewsProductoComponent } from './components/productos/reviews-producto/reviews-producto.component';
import { UpdateProductComponent } from './components/productos/update-product/update-product.component';
import { VariedadProductoComponent } from './components/productos/variedad-producto/variedad-producto.component';
import { DetalleVentasComponent } from './components/ventas/detalle-ventas/detalle-ventas.component';
import { IndexVentasComponent } from './components/ventas/index-ventas/index-ventas.component';
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
            path: 'productos/reviews/:id',
            component: ReviewsProductoComponent,
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
            path: 'descuentos',
            component: IndexDescuentoComponent,
          },
          {
            path: 'descuentos/registro',
            component: CreateDescuentoComponent,
          },
          {
            path: 'descuentos/:id',
            component: EditDescuentoComponent,
          },
          {
            path: 'configuraciones',
            component: ConfigComponent,
          },
          {
            path: 'ventas',
            component: IndexVentasComponent,
          },
          {
            path: 'ventas/:id',
            component: DetalleVentasComponent,
          },
          {
            path: 'contacto',
            component: IndexContactoComponent,
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
