import { Component } from '@angular/core';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'angular-pu-todor';

  constructor(public as: AuthService) { }

  get isLogged() {return this.as.isLogged(); }

  get isAdmin() {return this.as.isAdmin(); }

  get user() {return this.as.currentUserData; }

  get userNames() {return this.as.getCurrentUserNames(); }

  logout(): void {
    this.as.logout();
  }
}
