import {Component, OnInit} from '@angular/core';
import {CourseInterface} from '../../interfaces/course.interface';
import {CoursesService} from '../courses.service';
import {Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  courses: CourseInterface[];
  coursesDates: string[];

  constructor(private cs: CoursesService, private router: Router, private as: AuthService) {
    if (!this.isLogged) {
      this.router.navigateByUrl('auth/login');
    }
  }

  get isLogged() {return this.as.isLogged(); }

  get isAdmin() {return this.as.isAdmin(); }

  ngOnInit(): void {
    this.cs.getAllCourses().subscribe((courses) => {
      if (courses.length > 0) {
        this.courses = courses;
        this.coursesDates = [];

        for (const course of courses) {
          this.coursesDates[course.id] = new Date(course.created).toDateString();
        }
      }
    });
  }

}
