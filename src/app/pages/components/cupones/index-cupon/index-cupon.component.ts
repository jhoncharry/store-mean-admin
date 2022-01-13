import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { CuponService } from 'src/app/services/cupon.service';

declare var jQuery: any;
declare var $: any;

declare var iziToast: any;

@Component({
  selector: 'app-index-cupon',
  templateUrl: './index-cupon.component.html',
  styleUrls: ['./index-cupon.component.css'],
})
export class IndexCuponComponent implements OnInit {
  cupones: Array<any>;

  filtro_codigo: string = '';

  page = 1;
  pageSize = 10;

  load_data = true;

  constructor(private cuponService: CuponService) {
    this.initialData();
  }

  ngOnInit(): void {}

  initialData() {
    this.cuponService.getCupones(null).subscribe({
      next: (resp: any) => {
        this.cupones = resp.data;
        this.load_data = false;
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }

  filtro() {
    this.load_data = true;

    let filtro;

    if (this.filtro_codigo) {
      filtro = this.filtro_codigo;
      this.cuponService.getCupones(filtro).subscribe({
        next: (resp: any) => {
          this.cupones = resp.data;
          this.load_data = false;
        },
        error: (error) => {
          console.log('error', error);
          this.load_data = false;
        },
      });
    } else {
      // this.initialData();
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Ingrese un filtro para buscar',
      });
      this.load_data = false;
    }
  }

  resetear() {
    this.filtro_codigo = '';
    this.initialData();
  }

  deleteClient(id: any) {
    this.cuponService.deleteCupon(id).subscribe({
      next: (resp: any) => {
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          color: '#FFF',
          class: 'text-success',
          position: 'topRight',
          message: 'Cupon successfully deleted',
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
