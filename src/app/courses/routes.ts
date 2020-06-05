import {Routes} from '@angular/router';
import {ListComponent} from './list/list.component';
import {AddComponent} from './add/add.component';
import {ViewComponent} from './view/view.component';
import {EditComponent} from './edit/edit.component';
import {FavsComponent} from './favs/favs.component';

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
        path: 'list/favourites',
        component: FavsComponent
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
