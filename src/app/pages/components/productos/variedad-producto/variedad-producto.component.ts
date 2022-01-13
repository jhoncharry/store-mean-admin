import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagePipe } from 'src/app/pipes/image.pipe';
import { AdminService } from 'src/app/services/admin.service';
import { ProductService } from 'src/app/services/product.service';

import { v4 as uuidv4 } from 'uuid';

declare var jQuery: any;
declare var $: any;

declare var iziToast: any;

@Component({
  selector: 'app-variedad-producto',
  templateUrl: './variedad-producto.component.html',
  styleUrls: ['./variedad-producto.component.css'],
  providers: [ImagePipe],
})
export class VariedadProductoComponent implements OnInit {
  submitted = false;

  load_btn = false;
  load_data = true;

  private id: any;
  product: any;

  titulo_variedad: string = '';
  nueva_variedad: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];

      this.productService.getProduct(this.id).subscribe({
        next: async (resp: any) => {
          if (resp.data) {
            this.product = resp.data;
          }

          this.load_data = false;
        },
        error: (error: any) => {
          this.load_data = false;
          console.log('error', error);
          /*         iziToast.show({
            title: 'ERROR',
            titleColor: '#FF0000',
            color: '#FFF',
            class: 'text-danger',
            position: 'topRight',
            message: error.error.message,
          }); */
        },
      });
    });
  }

  ngOnInit(): void {}

  addVariedad() {
    this.load_data = true;

    if (this.nueva_variedad) {
      this.product.variedades.push({
        titulo: this.nueva_variedad,
      });

      this.nueva_variedad = '';
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Ingrese un los datos correspondiente',
      });
      this.load_data = false;
    }
  }

  update() {
    this.submitted = true;
    if (!this.product.titulo_variedad) {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Añadir titulo de la variedad',
      });
      return;
    }

    if (!(this.product.variedades.length >= 1)) {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Debes agregar al menos una variedad',
      });
      return;
    }

    this.load_btn = true;

    /*     let data = {
      titulo_variedad: this.product.titulo_variedad,
      variedades: this.product.variedades,
    }; */

    this.productService
      .updateVariedadesProduct(this.product._id, {
        titulo_variedad: this.product.titulo_variedad,
        variedades: this.product.variedades,
      })
      .subscribe({
        next: (resp: any) => {
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            color: '#FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'Product successfully updated',
          });

          this.load_btn = false;
          this.router.navigateByUrl('/panel/productos');
        },
        error: (error) => {
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

  eliminarVariedades(index: any) {
    this.product.variedades.splice(index, 1);
  }
}
