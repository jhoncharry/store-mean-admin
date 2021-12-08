import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';

declare var jQuery: any;
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css'],
})
export class IndexClienteComponent implements OnInit {
  clients: Array<any>;

  filtro_apellido: string = '';
  filtro_correo: string = '';

  page = 1;
  pageSize = 10;

  load_data = true;

  constructor(private clientService: ClientService) {
    this.initialData();
  }

  ngOnInit(): void {}

  initialData() {
    this.clientService.getClients(null, null).subscribe({
      next: (resp: any) => {
        this.clients = resp.data;
        this.load_data = false;
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }

  filtro(type: any) {
    this.load_data = true;
    console.log('dadadasd', this.filtro_correo);
    let filtro;

    if (type === 'apellidos' && this.filtro_apellido) {
      console.log('1111');
      filtro = this.filtro_apellido;
    } else if (type === 'correo' && this.filtro_correo) {
      console.log('2222');
      filtro = this.filtro_correo;
    } else {
      this.initialData();
      return;
    }

    this.clientService.getClients(type, filtro).subscribe({
      next: (resp: any) => {
        console.log('dasdsa', resp);
        this.clients = resp.data;
        this.load_data = false;
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }

  deleteClient(id: any) {
    this.clientService.deleteClient(id).subscribe({
      next: (resp: any) => {
        console.log('dasdsa', resp);
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          color: '#FFF',
          class: 'text-success',
          position: 'topRight',
          message: 'User successfully deleted',
        });

        $('#delete-' + id).modal('hide');
        $('.modal-backdrop').removeClass('show');

        this.initialData();
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }
}
