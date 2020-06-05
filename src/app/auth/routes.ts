import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {EditComponent} from './edit/edit.component';
import {ListComponent} from './list/list.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'users/edit/:id',
        component: EditComponent
      },
      {
        path: 'users/list',
        component: ListComponent
      }
    ]
  }
];
