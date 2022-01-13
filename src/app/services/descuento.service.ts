import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DescuentoService {
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

  createDescuento(data: any, file: any) {
    // formData.portada = file;

    const formData = new FormData();
    formData.append('titulo', data.titulo);
    formData.append('fecha_inicio', data.fecha_inicio);
    formData.append('fecha_fin', data.fecha_fin);
    formData.append('descuento', data.descuento);
    formData.append('banner', file);

    return this.http.post(
      this.url + '/admin/promocion',
      formData,
      this.headers
    );
  }

  getDescuentos(filtro: any) {
    return this.http.get(
      this.url + `/admin/promociones/${filtro}`,
      this.headers
    );
  }

  getDescuento(id: any) {
    return this.http.get(this.url + `/admin/promocion/${id}`, this.headers);
  }

  updateProduct(id: any, data: any, file: any) {
    if (!file) {
      return this.http.put(
        this.url + `/admin/promocion/${id}`,
        data,
        this.headers
      );
    } else {
      const formData = new FormData();
      formData.append('titulo', data.titulo);
      formData.append('fecha_inicio', data.fecha_inicio);
      formData.append('fecha_fin', data.fecha_fin);
      formData.append('descuento', data.descuento);
      formData.append('banner', file);

      return this.http.put(
        this.url + `/admin/promocion/${id}`,
        formData,
        this.headers
      );
    }
  }

  deleteDescuento(id: any) {
    return this.http.delete(this.url + `/admin/promocion/${id}`, this.headers);
  }
}
