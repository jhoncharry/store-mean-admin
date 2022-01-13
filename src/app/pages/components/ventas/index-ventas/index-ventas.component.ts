import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-index-ventas',
  templateUrl: './index-ventas.component.html',
  styleUrls: ['./index-ventas.component.css'],
})
export class IndexVentasComponent implements OnInit {
  desde: any;
  hasta: any;

  ventas: Array<any>;

  page = 1;
  pageSize = 12;

  constructor(private ventaService: VentaService) {}

  ngOnInit(): void {
    this.ventaService.getVentas(null, null).subscribe({
      next: async (resp: any) => {
        this.ventas = resp.data;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  filtrar() {
    this.ventaService.getVentas(this.desde, this.hasta).subscribe({
      next: async (resp: any) => {
        this.ventas = resp.data;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
