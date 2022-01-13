import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
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

  getClients(tipo: any, filtro: any) {
    return this.http.get(
      this.url + `/admin/clients/${tipo}/${filtro}`,
      this.headers
    );
  }

  getClient(id: any) {
    return this.http.get(this.url + `/admin/client/${id}`, this.headers);
  }

  createClient(formData: any) {
    console.log('dasdadasdasdas', formData);
    return this.http.post(this.url + '/admin/client', formData, this.headers);
  }

  updateClient(id: any, formData: any) {
    return this.http.put(
      this.url + `/admin/client/${id}`,
      formData,
      this.headers
    );
  }

  deleteClient(id: any) {
    return this.http.delete(this.url + `/admin/client/${id}`, this.headers);
  }

  getMensajesContacto() {
    return this.http.get(this.url + `/admin/contacts`, this.headers);
  }

  closeMensajesContacto(id: any, formData: any) {
    return this.http.put(
      this.url + `/admin/contact/${id}`,
      formData,
      this.headers
    );
  }

  getDetalleOrden(id: any) {
    return this.http.get(this.url + `/admin/orden-detalle/${id}`, this.headers);
  }
}
