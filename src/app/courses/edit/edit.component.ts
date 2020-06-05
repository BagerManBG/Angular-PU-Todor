import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CoursesService} from '../courses.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseInterface} from '../../interfaces/course.interface';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  course: CourseInterface;
  editCourseForm: FormGroup;

  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private cs: CoursesService, private router: Router, private ar: ActivatedRoute, private as: AuthService) {
    if (!this.isLogged) {
      this.router.navigateByUrl('auth/login');
    }

    if (!this.isAdmin) {
      this.router.navigateByUrl('course/list');
    }
  }

  get isLogged() {return this.as.isLogged(); }

  get isAdmin() {return this.as.isAdmin(); }

  ngOnInit(): void {
    this.cs.getCourse(this.ar.snapshot.params.id).subscribe((course: CourseInterface) => {
      if (course) {
        this.course = course;

        this.editCourseForm = this.fb.group({
          id: [course.id],
          title: [course.title, Validators.required],
          description: [course.description, Validators.required],
        });
      }
    });
  }

  editCourse() {
    this.editCourseForm.value.rating = this.course.rating;
    this.editCourseForm.value.created = this.course.created;

    this.cs.edit(this.editCourseForm.value).subscribe();
  }

}
