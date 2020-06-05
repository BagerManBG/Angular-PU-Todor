import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {UserInterface} from '../../interfaces/user.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  users: UserInterface[];

  constructor(private router: Router, private as: AuthService) {
    if (!this.isLogged) {
      this.router.navigateByUrl('auth/login');
    }

    if (!this.isAdmin) {
      this.router.navigateByUrl('courses/list');
    }
  }

  get isLogged() {return this.as.isLogged(); }

  get isAdmin() {return this.as.isAdmin(); }

  ngOnInit(): void {
    this.as.getAllUsers().subscribe((users) => {
      if (users.length > 0) {
        this.users = users.filter(user => !user.isAdmin);
      }
    });
  }

  block(user: UserInterface) {
    this.as.block(user);
  }

  unblock(user: UserInterface) {
    this.as.unblock(user);
  }

  delete(user) {
    this.as.delete(user);
  }

}
