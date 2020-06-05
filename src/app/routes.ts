import {Routes} from '@angular/router';
import {AppComponent} from './app.component';
export const routes: Routes = [
  // {
  //   path: '',
  //   component: AppComponent,
  //   pathMatch: 'full'
  // },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule)
  },
];
