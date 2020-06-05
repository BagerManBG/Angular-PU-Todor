import {HttpClient} from '@angular/common/http';
import {observable, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CourseInterface} from '../interfaces/course.interface';
import {UserInterface} from '../interfaces/user.interface';

@Injectable()
export class CoursesService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) { }

  create(course: CourseInterface): Observable<CourseInterface> {
    return new Observable((observer) => {
      this.http.post(`${this.baseUrl}/courses`, course)
        .subscribe((newCourse: CourseInterface) => {
          this.router.navigateByUrl(`courses/list/${newCourse?.id}`);
          observer.complete();
        });
    });
  }

  edit(course: CourseInterface): Observable<CourseInterface> {
    return new Observable((observer) => {
      this.http.patch(`${this.baseUrl}/courses/${course.id}`, course)
        .subscribe((newCourse: CourseInterface) => {
          this.router.navigateByUrl(`courses/list/${newCourse?.id}`);
          observer.complete();
        });
    });
  }

  delete(course: CourseInterface): void {
    this.http.delete(`${this.baseUrl}/courses/${course.id}`).subscribe(() => {
      this.router.navigateByUrl('courses/list');
    });
  }

  getAllCourses(): Observable<CourseInterface[]> {
    return this.http.get<CourseInterface[]>(this.baseUrl + '/courses');
  }

  getCourse(id: number): Observable<CourseInterface> {
    return this.http.get<CourseInterface>(this.baseUrl + '/courses/' + id);
  }

}
