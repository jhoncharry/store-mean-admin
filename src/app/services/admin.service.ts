import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private url;

  constructor(private http: HttpClient, private router: Router) {
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

  // Base del auth.guard
  validarToken(): Observable<boolean> {
    return this.http
      .get(this.url + 'admin/login/renew', {
        headers: {
          token: this.token,
        },
      })
      .pipe(
        map((resp: any) => {
          return true;
        }),
        catchError((error) => of(false))
      );
  }

  loginAdmin(formData: any) {
    return this.http.post(this.url + 'admin/login', formData);
  }

  // User logout method
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('_id');

    this.router.navigateByUrl('/login');
  }

  // Configuraciones
  getConfig() {
    return this.http.get(this.url + `/admin/config`, this.headers);
  }

  // Configuraciones
  getPublicConfig() {
    return this.http.get(this.url + `/client/config`);
  }

  updateConfig(id: any, data: any, file: any) {
    if (!file) {
      return this.http.put(
        this.url + `/admin/config/${id}`,
        data,
        this.headers
      );
    } else {
      const formData = new FormData();

      formData.append('titulo', data.titulo);
      formData.append('serie', data.serie);
      formData.append('correlativo', data.correlativo);
      formData.append('categorias', JSON.stringify(data.categorias));
      formData.append('logo', file);

      return this.http.put(
        this.url + `/admin/config/${id}`,
        formData,
        this.headers
      );
    }
  }

  // Kpi
  getKpi() {
    return this.http.get(this.url + `/admin/kpi`, this.headers);
  }
}
