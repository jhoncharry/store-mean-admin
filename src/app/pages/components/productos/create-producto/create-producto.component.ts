import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

declare var jQuery: any;
declare var $: any;

declare var iziToast: any;

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css'],
})
export class CreateProductoComponent implements OnInit {
  submitted = false;

  load_btn = false;

  file: File | undefined;
  imgSelect: any | ArrayBuffer = 'assets/img/01.jpg';

  imagesAllow: String[] = [
    'image/png',
    'image/webp',
    'image/jpg',
    'image/gif',
    'image/jpeg',
  ];

  config: any = {};

  public registerForm = this.fb.group({
    title: ['Title 1', [Validators.required, Validators.minLength(3)]],
    stock: ['', [Validators.required]],
    price: ['', [Validators.required]],
    categoria: [null, [Validators.required]],
    description: ['test1@gmail.com', [Validators.required]],
    contenido: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productService: ProductService
  ) {
    this.config = {
      height: 500,
    };
  }

  ngOnInit(): void {}

  //Add user form actions
  get getControl() {
    return this.registerForm.controls;
  }

  changeCategoria($event: any) {
    this.getControl['categoria'].setValue($event.target.value);
  }

  fileChangeEvent(event: any): void {
    let file: any;
    if (event.target.files && event.target.files[0]) {
      file = <File>event.target.files[0];

      console.log(file);
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'No hay una imagen de envio',
      });
    }

    if (file?.size! <= 4000000) {
      console.log('dasdas', file);
      if (this.imagesAllow.includes(file?.type)) {
        console.log('2222');
        const reader = new FileReader();
        reader.onload = (e) => (this.imgSelect = reader.result);
        console.log(this.imgSelect);
        reader.readAsDataURL(file);

        $('#input-portada').text(file.name);
        this.file = file;
      } else {
        console.log('33333');
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'El archivo debe ser una imagen',
        });

        $('#input-portada').text('Seleccionar imagen');

        this.imgSelect = 'assets/img/01.jpg';
        this.file = undefined;
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

      $('#input-portada').text('Seleccionar imagen');
      this.imgSelect = 'assets/img/01.jpg';
      this.file = undefined;
    }

    console.log(this.file);
  }

  register() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Datos del formulario no son validos',
      });
      return;
    }

    if (this.file === undefined) {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Debes subir una portada',
      });
      return;
    }

    this.load_btn = true;

    this.productService
      .createProduct(this.registerForm.value, this.file)
      .subscribe({
        next: (resp: any) => {
          console.log('THE RESPONSE', resp);
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            color: '#FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'Product successfully registered',
          });

          this.load_btn = false;
          this.registerForm.reset();
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

          this.load_btn = false;
        },
      });
  }
}
