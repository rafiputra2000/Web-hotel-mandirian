import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Auth } from '../model/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  storage: Storage = sessionStorage;

  constructor() {}

  login(payload: Auth): Observable<string | null> {
    return new Observable<string | null>(
      (observer: Observer<string | null>) => {
        try {
          const { username, password } = payload;
          if (username === 'admin@gmail.com' && password === 'password') {
            const token = 'enigma-123';
            this.storage.setItem('token', JSON.stringify(token));
            observer.next(token);
          } else {
            observer.next(null);
          }
        } catch (error: any) {
          observer.error(error.message);
        }
      }
    );
  }

  // register(payload: Auth): Observable<string | null> {
  //   return new Observable<string | null>(
  //     (observer: Observer<string | null>) => {
  //       try {
  //         const { username, password } = payload;
  //         if (username === 'admin@gmail.com' && password === 'password') {
  //           const token = 'enigma-123';
  //           this.storage.setItem('token', JSON.stringify(token));
  //           observer.next(token);
  //         } else {
  //           observer.next(null);
  //         }
  //       } catch (error: any) {
  //         observer.error(error.message);
  //       }
  //     }
  //   );
  // }

  logout(): Observable<string | null> {
    return new Observable<string | null>(
      (observer: Observer<string | null>) => {
        try {
          this.storage.removeItem('token');
        } catch (err: any) {
          observer.error(err.message);
        }
      }
    );
  }
}
