import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagePipe } from 'src/app/pipes/image.pipe';
import { ProductService } from 'src/app/services/product.service';

import { v4 as uuidv4 } from 'uuid';

declare var jQuery: any;
declare var $: any;

declare var iziToast: any;

@Component({
  selector: 'app-galeria-producto',
  templateUrl: './galeria-producto.component.html',
  styleUrls: ['./galeria-producto.component.css'],
  providers: [ImagePipe],
})
export class GaleriaProductoComponent implements OnInit {
  submitted = false;

  load_btn = false;
  load_data = true;

  private id: any;
  product: any;

  titulo_variedad: string = '';
  nueva_variedad: string = '';

  previewImage: string;

  file: File | undefined;
  imgSelect: any | ArrayBuffer = 'assets/img/01.jpg';

  imagesAllow: String[] = [
    'image/png',
    'image/webp',
    'image/jpg',
    'image/gif',
    'image/jpeg',
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];

      this.initData();
    });
  }

  initData() {
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
  }

  ngOnInit(): void {}

  fileChangeEvent(event: any): void {
    let file: any;
    if (event.target.files && event.target.files[0]) {
      file = <File>event.target.files[0];
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'No hay una imagen de envio',
      });
      $('#input-img').val('');
      this.file = undefined;
      return;
    }

    if (file?.size! <= 4000000) {
      if (this.imagesAllow.includes(file?.type)) {
        this.file = file;
      } else {
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'El archivo debe ser una imagen',
        });
        $('#input-img').val('');
        this.file = undefined;
        return;
      }
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'La imagen no puede superar los 4MB',
      });
      $('#input-img').val('');
      this.file = undefined;
      return;
    }
  }

  uploadImage() {
    this.submitted = true;
    if (this.file === undefined) {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Seleccione una imagen',
      });
      return;
    }

    this.load_btn = true;

    let data = {
      imagen: this.file,
      _id: uuidv4(),
    };

    this.productService.updateGaleriaProduct(this.product._id, data).subscribe({
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
        // this.router.navigateByUrl('/panel/productos');
        $('#input-img').val('');
        this.initData();
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

  eliminarGaleria(id: any) {
    this.productService
      .deleteGaleriaProduct(this.product._id, { _id: id })
      .subscribe({
        next: (resp: any) => {
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            color: '#FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'Imagen successfully deleted',
          });

          $('#delete-' + id).modal('hide');
          $('.modal-backdrop').removeClass('show');

          this.initData();
        },
        error: (error) => {
          console.log('error', error);
        },
      });
  }
}
