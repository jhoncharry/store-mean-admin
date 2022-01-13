import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

import { ImagePipe } from 'src/app/pipes/image.pipe';
import { AdminService } from 'src/app/services/admin.service';

declare var jQuery: any;
declare var $: any;

declare var iziToast: any;

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
  providers: [ImagePipe],
})
export class UpdateProductComponent implements OnInit {
  submitted = false;

  load_btn = false;
  load_data = true;

  private id: any;
  product: any;

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
    private route: ActivatedRoute,
    private productService: ProductService,
    private adminService: AdminService,
    private imagePipe: ImagePipe
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];

      this.productService.getProduct(this.id).subscribe({
        next: async (resp: any) => {
          this.product = resp.data;

          this.updateForm.setValue({
            title: this.product.title || '',
            stock: this.product.stock || '',
            price: this.product.price || '',
            categoria: this.product.categoria || null,
            description: this.product.description || '',
            contenido: this.product.contenido || '',
          });

          this.imgSelect = this.imagePipe.transform(
            this.product.portada,
            'productos'
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

    this.adminService.getPublicConfig().subscribe({
      next: (resp: any) => {
        if (resp.data) {
          this.config_categorias = resp.data;
        }

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

  changeCategoria($event: any) {
    this.getControl['categoria'].setValue($event.target.value);
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

    this.productService
      .updateProduct(this.product._id, this.updateForm.value, this.file)
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
          this.updateForm.reset();
          this.router.navigateByUrl('/panel/productos');
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
