import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { CuponService } from 'src/app/services/cupon.service';

declare var jQuery: any;
declare var $: any;

declare var iziToast: any;

@Component({
  selector: 'app-index-contacto',
  templateUrl: './index-contacto.component.html',
  styleUrls: ['./index-contacto.component.css'],
})
export class IndexContactoComponent implements OnInit {
  mensajes: Array<any>;

  filtro_codigo: string = '';

  page = 1;
  pageSize = 10;

  load_data = true;
  load_btn = false;

  constructor(private clienteService: ClientService) {
    this.initialData();
  }

  ngOnInit(): void {}

  initialData() {
    this.clienteService.getMensajesContacto().subscribe({
      next: (resp: any) => {
        this.mensajes = resp.data;
        this.load_data = false;
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }

  cerrar(id: any) {
    this.load_btn = true;
    this.clienteService
      .closeMensajesContacto(id, { data: undefined })
      .subscribe({
        next: (resp: any) => {
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            color: '#FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'Se cerró correctamente el mensaje.',
          });

          $('#estadoModal-' + id).modal('hide');
          $('.modal-backdrop').removeClass('show');

          this.initialData();
          this.load_data = false;
          this.load_btn = false;
        },
        error: (error) => {
          this.load_btn = false;
          console.log('error', error);
          iziToast.show({
            title: 'ERROR',
            titleColor: '#FF0000',
            color: '#FFF',
            class: 'text-danger',
            position: 'topRight',
            message: error.error.message,
          });
        },
      });
  }
}
