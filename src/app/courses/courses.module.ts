import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {routes} from './routes';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CoursesService} from './courses.service';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { FavsComponent } from './favs/favs.component';
import { CourseItemComponent } from './course-item/course-item.component';

@NgModule({
  declarations: [
    ListComponent,
    AddComponent,
    ViewComponent,
    EditComponent,
    FavsComponent,
    CourseItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    CoursesService
  ]
})
export class CoursesModule { }
