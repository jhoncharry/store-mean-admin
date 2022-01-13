import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-detalle-ventas',
  templateUrl: './detalle-ventas.component.html',
  styleUrls: ['./detalle-ventas.component.css'],
})
export class DetalleVentasComponent implements OnInit {
  submitted = false;

  load_btn = false;
  load_data = true;

  id: any;
  orden: any;
  detalles: Array<any>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientService
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.initialData();
  }

  ngOnInit(): void {}

  initialData() {
    this.clientService.getDetalleOrden(this.id).subscribe({
      next: async (resp: any) => {
        this.orden = resp.venta;
        this.detalles = resp.detalle_venta;

        /*        this.imgSelect = this.imagePipe.transform(
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
  }
}
