import { Component, OnInit } from '@angular/core';
import {CourseInterface} from '../../interfaces/course.interface';
import {CoursesService} from '../courses.service';
import {Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-favs',
  templateUrl: './favs.component.html',
  styleUrls: ['./favs.component.css']
})
export class FavsComponent implements OnInit {

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
        this.courses = courses.filter(c => this.as.currentUserData.courses.indexOf(c.id) >= 0);
        this.coursesDates = [];

        for (const course of this.courses) {
          this.coursesDates[course.id] = new Date(course.created).toDateString();
        }
      }
    });
  }

  addFavourite(course: CourseInterface) {
    if (this.as.currentUserData.courses.indexOf(course.id) < 0) {
      this.as.currentUserData.courses.push(course.id);
      this.cs.favourite(this.as.currentUserData).subscribe();
    }
  }

  removeFavourite(course: CourseInterface) {
    const index = this.as.currentUserData.courses.indexOf(course.id);
    if (index >= 0) {
      this.as.currentUserData.courses.splice(index, 1);
      this.cs.favourite(this.as.currentUserData).subscribe(() => {}, () => {}, () => {
        window.location.reload();
      });
    }
  }

  isFav(course: CourseInterface) {
    return (this.as.currentUserData.courses.indexOf(course.id) >= 0);
  }

}
