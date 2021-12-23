import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesComponent } from './pages.component';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InicioComponent } from './components/inicio/inicio.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { IndexClienteComponent } from './components/clientes/index-cliente/index-cliente.component';
import { CreateClienteComponent } from './components/clientes/create-cliente/create-cliente.component';
import { EditClienteComponent } from './components/clientes/edit-cliente/edit-cliente.component';
import { CreateProductoComponent } from './components/productos/create-producto/create-producto.component';
import { NgxTinymceModule } from 'ngx-tinymce';
import { IndexProductoComponent } from './components/productos/index-producto/index-producto.component';
import { ImageModule } from '../pipes/image.module';
import { UpdateProductComponent } from './components/productos/update-product/update-product.component';
import { InventarioProductoComponent } from './components/productos/inventario-producto/inventario-producto.component';
import { CreateCuponComponent } from './components/cupones/create-cupon/create-cupon.component';
import { IndexCuponComponent } from './components/cupones/index-cupon/index-cupon.component';
import { UpdateCuponComponent } from './components/cupones/update-cupon/update-cupon.component';
import { ConfigComponent } from './components/config/config.component';
import { VariedadProductoComponent } from './components/productos/variedad-producto/variedad-producto.component';
import { GaleriaProductoComponent } from './components/productos/galeria-producto/galeria-producto.component';

@NgModule({
  declarations: [
    PagesComponent,
    InicioComponent,
    SidebarComponent,
    IndexClienteComponent,
    CreateClienteComponent,
    EditClienteComponent,
    CreateProductoComponent,
    IndexProductoComponent,
    UpdateProductComponent,
    InventarioProductoComponent,
    CreateCuponComponent,
    IndexCuponComponent,
    UpdateCuponComponent,
    ConfigComponent,
    VariedadProductoComponent,
    GaleriaProductoComponent,
  ],
  exports: [
    PagesComponent,
    InicioComponent,
    SidebarComponent,
    IndexClienteComponent,
    CreateClienteComponent,
    EditClienteComponent,
    CreateProductoComponent,
    IndexProductoComponent,
    UpdateProductComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbPaginationModule,
    NgxTinymceModule.forRoot({
      baseURL: '../../../assets/tinymce/',
    }),
    ImageModule,
  ],
})
export class PagesModule {}
