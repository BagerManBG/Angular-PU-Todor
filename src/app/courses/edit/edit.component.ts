import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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

  constructor(private fb: FormBuilder, private cs: CoursesService, private router: Router, private ar: ActivatedRoute, private as: AuthService) {
    if (!this.isLogged) {
      this.router.navigateByUrl('auth/login');
    }

    if (!this.isAdmin) {
      this.router.navigateByUrl('courses/list');
    }

    this.cs.getCourse(this.ar.snapshot.params.id).subscribe((course: CourseInterface) => {
      if (course) {
        this.course = course;

        this.editCourseForm = this.fb.group({
          id: new FormControl(this.course.id),
          title: new FormControl(this.course.title, [Validators.required]),
          description: new FormControl(this.course.description, [Validators.required]),
        });
      }
    });
  }

  get isLogged() {return this.as.isLogged(); }

  get isAdmin() {return this.as.isAdmin(); }

  ngOnInit(): void {

  }

  editCourse() {
    this.editCourseForm.value.rating = this.course.rating;
    this.editCourseForm.value.created = this.course.created;

    this.cs.edit(this.editCourseForm.value).subscribe();
  }

}
