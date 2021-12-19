import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

import { ImagePipe } from 'src/app/pipes/image.pipe';

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
    private imagePipe: ImagePipe
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];

      this.productService.getProduct(this.id).subscribe({
        next: async (resp: any) => {
          this.product = resp.data;

          console.log(resp);

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

  update() {
    this.submitted = true;
    console.log('eeeeee', this.getControl);
    if (this.updateForm.invalid) {
      return;
    }

    console.log(this.updateForm.value);
    console.log(this.file);
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
