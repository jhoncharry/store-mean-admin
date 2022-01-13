import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

import Chart from 'chart.js/auto';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  total_ganancia = 0;
  total_mes = 0;
  total_mes_anterior = 0;
  count_ventas = 0;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.initialData();
  }

  initialData() {
    this.adminService.getKpi().subscribe({
      next: async (resp: any) => {
        this.total_ganancia = resp.data.total_ganancia;
        this.total_mes = resp.data.total_mes;
        this.count_ventas = resp.data.count_ventas;
        this.total_mes_anterior = resp.data.total_mes_anterior;

        let canvas = <HTMLCanvasElement>document.getElementById('myChart');
        let ctx: any = canvas.getContext('2d');

        const myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: [
              'Enero',
              'Febrero',
              'Marzo',
              'Abril',
              'Mayo',
              'Junio',
              'Julio',
              'Agosto',
              'Septiembre',
              'Octubre',
              'Noviembre',
              'Dicembre',
            ],
            datasets: [
              {
                label: 'Meses',
                data: [
                  resp.data.enero,
                  resp.data.febrero,
                  resp.data.marzo,
                  resp.data.abril,
                  resp.data.mayo,
                  resp.data.junio,
                  resp.data.julio,
                  resp.data.agosto,
                  resp.data.septiembre,
                  resp.data.octubre,
                  resp.data.noviembre,
                  resp.data.diciembre,
                ],
                backgroundColor: 'solid',
                borderColor: 'blue',
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
