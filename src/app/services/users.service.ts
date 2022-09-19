import { Injectable } from '@angular/core';
import { Users } from 'src/models/users.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UsersService {
  backEndURL: string = "";
  list: any = [];
  oneItem: Users = new Users();
  user:any;

  constructor(private http: HttpClient) {
    this.backEndURL = this.getBackEndUrl();
  }

  //Get
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.backEndURL}/users`);
  }

  //Get
  getOnceUser(id: number): Observable<any> {
    return this.http.get(`${this.backEndURL}/users/` + id);
  }
  //Post
  createUser(item: any) {
    return this.http.post(`${this.backEndURL}/users`, item);
  }

  //Post
  deletUser(id: number): Observable<any> {
    this.getOnceUser(id).subscribe((res: any) => {
      this.user = res;
    })
    return this.http.post(`${this.backEndURL}/users/` + id +"/delete", this.user);
  }


  getBackEndUrl(): string {
    const segements = document.URL.split('/');
    const reggie = new RegExp(/localhost/);
    return reggie.test(segements[2]) ? 'http://localhost:3000' : 'https://nestjs-typeorm-postgres.herokuapp.com';
  }

}
