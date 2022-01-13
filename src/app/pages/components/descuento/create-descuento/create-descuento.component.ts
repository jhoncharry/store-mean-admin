import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { DescuentoService } from 'src/app/services/descuento.service';
import { ProductService } from 'src/app/services/product.service';

declare var jQuery: any;
declare var $: any;

declare var iziToast: any;

@Component({
  selector: 'app-create-descuento',
  templateUrl: './create-descuento.component.html',
  styleUrls: ['./create-descuento.component.css'],
})
export class CreateDescuentoComponent implements OnInit {
  submitted = false;

  load_btn = false;
  load_data = true;

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

  config_categorias: any;

  public registerForm = this.fb.group({
    titulo: ['Title 1', [Validators.required, Validators.minLength(3)]],
    fecha_inicio: [
      '',
      [
        Validators.required,
        Validators.pattern(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/),
      ],
    ],
    fecha_fin: [
      '',
      [
        Validators.required,
        Validators.pattern(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/),
      ],
    ],
    descuento: [
      '',
      [Validators.min(0), Validators.max(100), Validators.required],
    ],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private descuentoService: DescuentoService,
    private adminService: AdminService
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
    }

    if (file?.size! <= 4000000) {
      if (this.imagesAllow.includes(file?.type)) {
        const reader = new FileReader();
        reader.onload = (e) => (this.imgSelect = reader.result);

        reader.readAsDataURL(file);

        $('#input-portada').text(file.name);
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
        message: 'Debes subir un banner',
      });
      return;
    }

    this.load_btn = true;

    this.descuentoService
      .createDescuento(this.registerForm.value, this.file)
      .subscribe({
        next: (resp: any) => {
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            color: '#FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'Descuento successfully registered',
          });

          this.load_btn = false;
          this.registerForm.reset();
          this.router.navigateByUrl('/panel/descuentos');
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
