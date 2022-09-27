import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  backEndURL: string = "";
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;


  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user') || '{}'));
    this.user = this.userSubject.asObservable();
    this.backEndURL = this.getBackEndUrl();
  }

  public get userValue(): any {
    if (this.userSubject.value != '{}') {
      return this.userSubject.value;
    } else {
      this.router.navigate(['/login']);
      return null;
    }
  }

  login(username: string, password: string) {
    console.log(username)

    let auth = {
      username: username,
      hash_raw_password: password
    };

    return this.http.post<any>(`${this.backEndURL}/auth`, auth)
      .pipe(map(user => {
        // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
        // user.authdata = window.btoa(username + ':' + password);
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  getBackEndUrl(): string {
    const segements = document.URL.split('/');
    const reggie = new RegExp(/localhost/);
    return reggie.test(segements[2]) ? 'http://localhost:3000' : 'https://nestjs-typeorm-postgres.herokuapp.com';
  }
}
