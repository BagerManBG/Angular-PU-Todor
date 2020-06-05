import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CoursesService} from '../courses.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  addCourseForm: FormGroup;

  constructor(private fb: FormBuilder, private cs: CoursesService, private router: Router, private as: AuthService) {
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
    this.addCourseForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  addCourse() {
    this.addCourseForm.value.rating = [];
    this.addCourseForm.value.created = new Date().getTime();

    this.cs.create(this.addCourseForm.value).subscribe();
  }

}
