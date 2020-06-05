import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private as: AuthService, private router: Router) {
    if (this.isLogged) {
      this.router.navigateByUrl('courses/list');
    }
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      id: [''],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  get isLogged() {return this.as.isLogged(); }

  get isAdmin() {return this.as.isAdmin(); }

  onRegister() {
    this.registerForm.value.isAdmin = false;
    this.registerForm.value.isBlocked = false;
    this.registerForm.value.courses = [];

    this.as
      .getAllUsers()
      .subscribe(allUsers => {
        const user = allUsers
          .find(u => u.email === this.registerForm.value.email);

        if (user) {
          alert('This email is taken!');
        } else {
          this.as.register(this.registerForm.value).subscribe();
          this.router.navigateByUrl('auth/login');
        }
    });
  }
}
