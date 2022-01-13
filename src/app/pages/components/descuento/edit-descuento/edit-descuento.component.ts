import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagePipe } from 'src/app/pipes/image.pipe';
import { AdminService } from 'src/app/services/admin.service';
import { DescuentoService } from 'src/app/services/descuento.service';
import { ProductService } from 'src/app/services/product.service';

declare var jQuery: any;
declare var $: any;

declare var iziToast: any;

@Component({
  selector: 'app-edit-descuento',
  templateUrl: './edit-descuento.component.html',
  styleUrls: ['./edit-descuento.component.css'],
  providers: [ImagePipe],
})
export class EditDescuentoComponent implements OnInit {
  submitted = false;

  load_btn = false;
  load_data = true;

  private id: any;
  descuento: any;

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

  config: any = {};

  config_categorias: any;

  public updateForm = this.fb.group({
    titulo: [' 1', [Validators.required, Validators.minLength(3)]],
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
    private route: ActivatedRoute,
    private descuentoService: DescuentoService,
    private adminService: AdminService,
    private imagePipe: ImagePipe
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];

      this.descuentoService.getDescuento(this.id).subscribe({
        next: async (resp: any) => {
          this.descuento = resp.data;

          this.updateForm.setValue({
            titulo: this.descuento.titulo || '',
            fecha_inicio: this.descuento.fecha_inicio || '',
            fecha_fin: this.descuento.fecha_fin || '',
            descuento: this.descuento.descuento || 0,
          });

          this.imgSelect = this.imagePipe.transform(
            this.descuento.banner,
            'promocion'
          );

          this.load_data = false;
          /* 
          this.updateForm.reset();
          this.router.navigateByUrl('/panel/clientes'); */
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

  //Add user form actions
  get getControl() {
    return this.updateForm.controls;
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
      return;
    }

    this.load_btn = true;

    this.descuentoService
      .updateProduct(this.descuento._id, this.updateForm.value, this.file)
      .subscribe({
        next: (resp: any) => {
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            color: '#FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'Descuento successfully updated',
          });

          this.load_btn = false;
          this.updateForm.reset();
          this.router.navigateByUrl('/panel/descuentos');
        },
        error: (error: any) => {
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
