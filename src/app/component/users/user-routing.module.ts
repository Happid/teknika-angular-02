import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUserComponent } from './pages/list-user/list-user.component';
import { DetailUserComponent } from './pages/detail-user/detail-user.component';

const route: Routes = [
 
    { path: '', component: ListUserComponent },
    { path: 'tambah', component: DetailUserComponent },
    { path: 'detail/:id', component: DetailUserComponent },
 
];
 
@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
