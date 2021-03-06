import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagePipe } from 'src/app/pipes/image.pipe';
import { AdminService } from 'src/app/services/admin.service';

import { v4 as uuidv4 } from 'uuid';

declare var jQuery: any;
declare var $: any;

declare var iziToast: any;

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
  providers: [ImagePipe],
})
export class ConfigComponent implements OnInit {
  submitted = false;

  load_btn = false;
  load_data = true;

  private id: any;
  config: any;

  titulo_categoria = '';
  icono_categoria = '';

  file: File | undefined;
  imgSelect: any | ArrayBuffer = 'assets/img/01.jpg';

  imagesAllow: String[] = [
    'image/png',
    'image/webp',
    'image/jpg',
    'image/gif',
    'image/jpeg',
  ];

  public updateForm = this.fb.group({
    titulo: ['', [Validators.required, Validators.minLength(3)]],
    serie: ['', [Validators.required]],
    correlativo: ['', [Validators.required, Validators.minLength(2)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private adminService: AdminService,
    private imagePipe: ImagePipe
  ) {
    this.adminService.getConfig().subscribe({
      next: (resp: any) => {
        if (resp.data) {
          this.config = resp.data;
        }

        this.updateForm.setValue({
          titulo: this.config.titulo || '',
          serie: this.config.serie || '',
          correlativo: this.config.correlativo || '',
        });

        this.imgSelect = this.imagePipe.transform(
          this.config.logo,
          'configuraciones'
        );

        this.load_data = false;
        /* 
          this.updateForm.reset();
          this.router.navigateByUrl('/panel/clientes'); */
      },
      error: (error) => {
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

  //Add user form actions
  get getControl() {
    return this.updateForm.controls;
  }

  addCategory() {
    this.load_data = true;

    let data;

    if (this.titulo_categoria && this.icono_categoria) {
      this.config.categorias.push({
        titulo: this.titulo_categoria,
        icono: this.icono_categoria,
        _id: uuidv4(),
      });

      this.titulo_categoria = '';
      this.icono_categoria = '';
    } else {
      // this.initialData();
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

  update() {
    this.submitted = true;

    if (this.updateForm.invalid) {
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

    this.load_btn = true;

    let data = {
      categorias: this.config.categorias || '',
      ...this.updateForm.value,
    };

    this.adminService.updateConfig(this.config._id, data, this.file).subscribe({
      next: (resp: any) => {
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          color: '#FFF',
          class: 'text-success',
          position: 'topRight',
          message: 'Cupon successfully updated',
        });

        this.load_btn = false;
        this.updateForm.reset();
        this.router.navigateByUrl('/');
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

  eliminarCategorias(index: any) {
    this.config.categorias.splice(index, 1);
  }
}
