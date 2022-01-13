import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagePipe } from 'src/app/pipes/image.pipe';
import { ProductService } from 'src/app/services/product.service';

import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

declare var jQuery: any;
declare var $: any;

declare var iziToast: any;

@Component({
  selector: 'app-inventario-producto',
  templateUrl: './inventario-producto.component.html',
  styleUrls: ['./inventario-producto.component.css'],
  providers: [ImagePipe],
})
export class InventarioProductoComponent implements OnInit {
  submitted = false;

  load_btn = false;
  load_data = true;

  private id: any;

  product: any;
  inventarios: Array<any> = [];
  array_inventarios: Array<any> = [];

  public registerInventarioForm = this.fb.group({
    cantidad: ['', [Validators.required, Validators.minLength(1)]],
    proveedor: ['', [Validators.required, Validators.minLength(3)]],
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

          this.productService.getInventarioProduct(this.product._id).subscribe({
            next: async (resp: any) => {
              if (resp.data) {
                this.inventarios = resp.data;
                this.inventarios.forEach((element) => {
                  this.array_inventarios.push({
                    admin: element.admin.name + ' ' + element.admin.lastname,
                    cantidad: element.cantidad,
                    proveedor: element.proveedor,
                  });
                });
              }
            },
            error: (error: any) => {
              console.log('error', error);
            },
          });

          /*         this.updateForm.setValue({
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
          ); */

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

  //Add inventario form actions
  get getControl() {
    return this.registerInventarioForm.controls;
  }

  registerInventario() {
    this.submitted = true;

    if (this.registerInventarioForm.invalid) {
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
      product: this.product._id,
      ...this.registerInventarioForm.value,
    };

    this.productService.createInventario(data).subscribe({
      next: (resp: any) => {
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          color: '#FFF',
          class: 'text-success',
          position: 'topRight',
          message: 'Inventario successfully registered',
        });

        this.load_btn = false;
        this.registerInventarioForm.reset();

        this.productService.getInventarioProduct(this.product._id).subscribe({
          next: async (resp: any) => {
            if (resp.data) {
              this.inventarios = resp.data;
            }
          },
          error: (error: any) => {
            console.log('error', error);
          },
        });

        /*         this.router.navigateByUrl('/panel/productos'); */
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

  deleteInventarioProduct(id: any) {
    this.productService.deleteInventarioProduct(id).subscribe({
      next: (resp: any) => {
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

        this.productService.getInventarioProduct(this.product._id).subscribe({
          next: async (resp: any) => {
            if (resp.data) {
              this.inventarios = resp.data;
            }
          },
          error: (error: any) => {
            console.log('error', error);
          },
        });
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }

  downloadExcel() {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Reporte de inventarios');

    worksheet.addRow(undefined);
    for (let x1 of this.array_inventarios) {
      let x2 = Object.keys(x1);

      let temp = [];
      for (let y of x2) {
        temp.push(x1[y]);
      }
      worksheet.addRow(temp);
    }

    let fname = 'REP01- ';

    worksheet.columns = [
      { header: 'Trabajador', key: 'col1', width: 30 },
      { header: 'Cantidad', key: 'col2', width: 15 },
      { header: 'Proveedor', key: 'col3', width: 25 },
    ] as any;

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, fname + '-' + new Date().valueOf() + '.xlsx');
    });
  }
}
