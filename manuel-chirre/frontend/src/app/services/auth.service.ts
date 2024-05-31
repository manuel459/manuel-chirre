import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, tap } from 'rxjs';
import { Response } from '../interfaces/Response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'secreto';
  
  constructor(private http: HttpClient,  private router: Router) { }

  login(login: any): Observable<Response>{
    return this.http.post<Response>(environment.dev+ 'auth/login', login).pipe(
      tap(response => {
        console.log('respuesta', response)
        if (response.succest) {
          console.log(response.data.accessToken);
          this.setToken(response.data.accessToken);
        }
      })
    );;
  }
  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

}
