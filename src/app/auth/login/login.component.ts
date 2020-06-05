import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private as: AuthService, private router: Router) {
    if (!this.isLogged) {
      this.router.navigateByUrl('course/list');
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
      .subscribe(() => {
        this.router.navigateByUrl('courses/list');
      }, error => {
        alert(error);
      });
  }

}
