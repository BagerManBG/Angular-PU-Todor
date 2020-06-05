import {Component, Input, OnInit} from '@angular/core';
import {CourseInterface} from '../../interfaces/course.interface';
import {CoursesService} from '../courses.service';
import {AuthService} from '../../auth/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css']
})
export class CourseItemComponent implements OnInit {

  @Input() course: CourseInterface;
  @Input() courseDate: string;
  @Input() isAdmin: boolean;
  rateForm: FormGroup;
  rating: number;

  constructor(private cs: CoursesService, private as: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    const radioName = 'optradio-' + this.course.id;
    const radioObject = {};
    radioObject['courseId'] = [this.course.id];
    radioObject[radioName] = ['', Validators.required];

    this.rateForm = this.fb.group(radioObject);

    this.rating = 0;
    let ratingCount = 0;

    for (const rating of this.course.rating) {
      if (rating) {
        this.rating += Number(rating);
        ratingCount++;
      }
    }

    if (ratingCount > 0) {
      this.rating /= ratingCount;
      this.rating = Math.round((this.rating + Number.EPSILON) * 100) / 100;
    }
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
      this.cs.favourite(this.as.currentUserData).subscribe();
    }
  }

  isFav(course: CourseInterface) {
    return (this.as.currentUserData.courses.indexOf(course.id) >= 0);
  }

  rateSubmit() {
    const radioName = 'optradio-' + this.course.id;
    this.cs.rate(this.rateForm.value[radioName], this.rateForm.value.courseId, this.as.currentUserData.id);
  }

  isChecked(radio: number): boolean {
    return Boolean(this.course.rating[this.as.currentUserData.id] == radio);
  }
}
