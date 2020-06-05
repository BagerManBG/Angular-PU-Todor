import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseInterface} from '../../interfaces/course.interface';
import {CoursesService} from '../courses.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  course: CourseInterface;
  createdDate: string;

  constructor(private ar: ActivatedRoute, private cs: CoursesService, private router: Router, private as: AuthService) {
    if (!this.isLogged) {
      this.router.navigateByUrl('auth/login');
    }

    if (this.isLogged && !this.isAdmin) {
      this.router.navigateByUrl('courses/list');
    }
  }

  get isLogged() {return this.as.isLogged(); }

  get isAdmin() {return this.as.isAdmin(); }

  ngOnInit(): void {
    this.cs.getCourse(this.ar.snapshot.params.id).subscribe((course: CourseInterface) => {
      if (course) {
        this.course = course;
        this.createdDate = new Date(course.created).toDateString();
      }
    });
  }

  delete() {
    this.cs.delete(this.course);
  }

}
