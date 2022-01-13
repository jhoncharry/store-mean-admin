import { Component, OnInit } from '@angular/core';

import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { DescuentoService } from 'src/app/services/descuento.service';
import { ProductService } from 'src/app/services/product.service';

declare var jQuery: any;
declare var $: any;

declare var iziToast: any;

@Component({
  selector: 'app-index-descuento',
  templateUrl: './index-descuento.component.html',
  styleUrls: ['./index-descuento.component.css'],
})
export class IndexDescuentoComponent implements OnInit {
  descuentos: Array<any>;
  array_descuentos: Array<any> = [];

  filtro_title: string = '';

  page = 1;
  pageSize = 10;

  load_data = true;

  url: string;

  constructor(private descuentoService: DescuentoService) {
    this.initialData();
  }

  ngOnInit(): void {}

  initialData() {
    this.descuentoService.getDescuentos(null).subscribe({
      next: (resp: any) => {
        if (resp.data) {
          this.descuentos = resp.data;
          this.descuentos.forEach((element) => {
            /*    this.array_descuentos.push({
              title: element.title,
              stock: element.stock,
              price: element.price,
              categoria: element.categoria,
              numero_ventas: element.numero_ventas,
            }); */

            let time_inicio =
              Date.parse(element.fecha_inicio + 'T00:00:00') / 1000;
            let time_fin = Date.parse(element.fecha_fin + 'T00:00:00') / 1000;

            let today = Date.parse(new Date().toString()) / 1000;

            if (today > time_inicio) {
              element.estado = 'Expirado';
            }
            if (today < time_inicio) {
              element.estado = 'Proximamente';
            }
            if (today >= time_inicio && today <= time_fin) {
              element.estado = 'En progreso';
            }
          });
        }

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

    if (this.filtro_title) {
      filtro = this.filtro_title;
      this.descuentoService.getDescuentos(filtro).subscribe({
        next: (resp: any) => {
          this.descuentos = resp.data;
          this.load_data = false;
        },
        error: (error) => {
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
    this.filtro_title = '';
    this.initialData();
  }

  deleteDescuento(id: any) {
    this.descuentoService.deleteDescuento(id).subscribe({
      next: (resp: any) => {
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          color: '#FFF',
          class: 'text-success',
          position: 'topRight',
          message: 'Product successfully deleted',
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
