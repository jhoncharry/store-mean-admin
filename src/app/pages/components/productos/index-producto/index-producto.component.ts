import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

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
        this.products = resp.data;
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
}
