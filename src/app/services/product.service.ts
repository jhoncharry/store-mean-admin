import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
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

  getProducts(filtro: any) {
    return this.http.get(this.url + `/admin/products/${filtro}`, this.headers);
  }

  getProduct(id: any) {
    return this.http.get(this.url + `/admin/product/${id}`, this.headers);
  }

  createProduct(data: any, file: any) {
    // formData.portada = file;

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('stock', data.stock);
    formData.append('price', data.price);
    formData.append('description', data.description);
    formData.append('contenido', data.contenido);
    formData.append('categoria', data.categoria);
    formData.append('portada', file);

    return this.http.post(this.url + '/admin/product', formData, this.headers);
  }

  updateProduct(id: any, data: any, file: any) {
    if (!file) {
      return this.http.put(
        this.url + `/admin/product/${id}`,
        data,
        this.headers
      );
    } else {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('stock', data.stock);
      formData.append('price', data.price);
      formData.append('description', data.description);
      formData.append('contenido', data.contenido);
      formData.append('categoria', data.categoria);
      formData.append('portada', file);

      return this.http.put(
        this.url + `/admin/product/${id}`,
        formData,
        this.headers
      );
    }
  }

  updateVariedadesProduct(id: any, data: any) {
    return this.http.put(
      this.url + `/admin/variedades/product/${id}`,
      data,
      this.headers
    );
  }

  updateGaleriaProduct(id: any, data: any) {
    const formData = new FormData();
    formData.append('_id', data._id);
    formData.append('imagen', data.imagen);

    return this.http.put(
      this.url + `/admin/galeria/product/${id}`,
      formData,
      this.headers
    );
  }

  deleteGaleriaProduct(id: any, data: any) {
    return this.http.put(
      this.url + `/admin/galeria/delete/product/${id}`,
      data,
      this.headers
    );
  }

  deleteProduct(id: any) {
    return this.http.delete(this.url + `/admin/product/${id}`, this.headers);
  }

  createInventario(formData: any) {
    return this.http.post(
      this.url + '/admin/inventario',
      formData,
      this.headers
    );
  }

  getInventarioProduct(id: any) {
    return this.http.get(this.url + `/admin/inventario/${id}`, this.headers);
  }

  deleteInventarioProduct(id: any) {
    return this.http.delete(this.url + `/admin/inventario/${id}`, this.headers);
  }

  getReviewsProduct(id: any) {
    return this.http.get(
      this.url + `/admin/reviews/product/${id}`,
      this.headers
    );
  }
}
