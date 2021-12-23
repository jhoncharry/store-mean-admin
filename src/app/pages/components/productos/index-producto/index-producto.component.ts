import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

declare var jQuery: any;
declare var $: any;

declare var iziToast: any;

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css'],
})
export class IndexProductoComponent implements OnInit {
  products: Array<any>;
  array_products: Array<any> = [];

  filtro_title: string = '';

  page = 1;
  pageSize = 10;

  load_data = true;

  url: string;

  constructor(private productService: ProductService) {
    this.initialData();
  }

  ngOnInit(): void {}

  initialData() {
    this.productService.getProducts(null).subscribe({
      next: (resp: any) => {
        if (resp.data) {
          this.products = resp.data;
          this.products.forEach((element) => {
            this.array_products.push({
              title: element.title,
              stock: element.stock,
              price: element.price,
              categoria: element.categoria,
              numero_ventas: element.numero_ventas,
            });
          });
        }

        console.log('NEW ARRAY', this.array_products);
        this.load_data = false;
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }

  filtro() {
    this.load_data = true;
    console.log('dadadasd', this.filtro_title);
    let filtro;

    if (this.filtro_title) {
      console.log('1111');
      filtro = this.filtro_title;
      this.productService.getProducts(filtro).subscribe({
        next: (resp: any) => {
          console.log('dasdsa', resp);
          this.products = resp.data;
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
    this.filtro_title = '';
    this.initialData();
  }

  deleteProduct(id: any) {
    this.productService.deleteProduct(id).subscribe({
      next: (resp: any) => {
        console.log('dasdsa', resp);
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

  downloadExcel() {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Reporte de productos');

    worksheet.addRow(undefined);
    for (let x1 of this.array_products) {
      let x2 = Object.keys(x1);

      let temp = [];
      for (let y of x2) {
        temp.push(x1[y]);
      }
      worksheet.addRow(temp);
    }

    let fname = 'REP01- ';

    worksheet.columns = [
      { header: 'Producto', key: 'col1', width: 30 },
      { header: 'Stock', key: 'col2', width: 15 },
      { header: 'Precio', key: 'col3', width: 15 },
      { header: 'Categoria', key: 'col4', width: 25 },
      { header: 'N° ventas', key: 'col5', width: 15 },
    ] as any;

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, fname + '-' + new Date().valueOf() + '.xlsx');
    });
  }
}
