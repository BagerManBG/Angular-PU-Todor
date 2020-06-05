import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  userForm: FormGroup;

  constructor(private fb: FormBuilder, private as: AuthService, private router: Router) {
    if (!this.isLogged) {
      this.router.navigateByUrl('auth/login');
    }
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      id: [this.user?.id],
      firstName: [this.user?.firstName, [Validators.required, Validators.minLength(2)]],
      lastName: [this.user?.lastName, [Validators.required, Validators.minLength(2)]],
      password: [this.user?.password, [Validators.required, Validators.minLength(5)]],
    });
  }

  get isLogged() {return this.as.isLogged(); }

  get isAdmin() {return this.as.isAdmin(); }

  get user() {return this.as.currentUserData; }

  editUser() {
    this.userForm.value.email = this.user?.email;
    this.userForm.value.isAdmin = this.user?.isAdmin;
    this.userForm.value.isBlocked = this.user?.isBlocked;
    this.userForm.value.courses = this.user?.courses;

    this.as.edit(this.userForm.value);
  }

}
