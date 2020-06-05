import {Routes} from '@angular/router';
import {ListComponent} from './list/list.component';
import {AddComponent} from './add/add.component';
import {ViewComponent} from './view/view.component';
import {EditComponent} from './edit/edit.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: 'add',
        component: AddComponent
      },
      {
        path: 'list/:id',
        component: ViewComponent
      },
      {
        path: 'edit/:id',
        component: EditComponent
      }
    ]
  }
];
