import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    backEndURL: string = "";
    constructor(private authenticationService: AuthenticationService) {
        this.backEndURL = this.getBackEndUrl();
     }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add header with basic auth credentials if user is logged in and request is to the api url
        const user = this.authenticationService.userValue;
        const isLoggedIn = user && user.username;
        const isApiUrl = request.url.startsWith(this.backEndURL);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Basic ${user.username}`
                }
            });
        }

        return next.handle(request);
    }
    getBackEndUrl(): string {
        const segements = document.URL.split('/');
        const reggie = new RegExp(/localhost/);
        return reggie.test(segements[2]) ? 'http://localhost:3000' : 'https://nestjs-typeorm-postgres.herokuapp.com';
    }
}