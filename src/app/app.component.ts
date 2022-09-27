import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user: any;

  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.user.subscribe(x => this.user = x);
  }


  title = 'portal';
}
