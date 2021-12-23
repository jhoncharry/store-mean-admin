import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CuponService {
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

  createCupon(formData: any) {
    return this.http.post(this.url + '/admin/cupon', formData, this.headers);
  }

  getCupones(filtro: any) {
    return this.http.get(this.url + `/admin/cupones/${filtro}`, this.headers);
  }

  getCupon(id: any) {
    return this.http.get(this.url + `/admin/cupon/${id}`, this.headers);
  }

  updateCupon(id: any, formData: any) {
    return this.http.put(
      this.url + `/admin/cupon/${id}`,
      formData,
      this.headers
    );
  }

  deleteCupon(id: any) {
    return this.http.delete(this.url + `/admin/cupon/${id}`, this.headers);
  }
}
