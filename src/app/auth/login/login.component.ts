import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {UserInterface} from '../../interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private as: AuthService, private router: Router) {
    if (this.isLogged) {
      this.router.navigateByUrl('courses/list');
    }
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      id: [''],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get isLogged() {return this.as.isLogged(); }

  get isAdmin() {return this.as.isAdmin(); }

  onLogin() {
    this.as
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe((user: UserInterface) => {}, error => {alert(error); });
  }

}
