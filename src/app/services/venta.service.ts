import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VentaService {
  private url;

  constructor(private http: HttpClient) {
    this.url = environment.api;
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        token: this.token,
      },
    };
  }

  getVentas(desde: any, hasta: any) {
    return this.http.get(
      this.url + `/admin/ventas/${desde}/${hasta}`,
      this.headers
    );
  }

  getDetalleOrden(id: any) {
    return this.http.get(this.url + `/admin/orden-detalle/${id}`, this.headers);
  }
}
