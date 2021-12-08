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

@NgModule({
  declarations: [
    PagesComponent,
    InicioComponent,
    SidebarComponent,
    IndexClienteComponent,
    CreateClienteComponent,
    EditClienteComponent,
  ],
  exports: [
    PagesComponent,
    InicioComponent,
    SidebarComponent,
    IndexClienteComponent,
    CreateClienteComponent,
    EditClienteComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbPaginationModule,
  ],
})
export class PagesModule {}
