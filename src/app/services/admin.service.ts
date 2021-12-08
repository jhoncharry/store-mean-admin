import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
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

  
}
