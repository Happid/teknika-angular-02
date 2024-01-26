import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './user-routing.module';
import { ListUserComponent } from './pages/list-user/list-user.component';
import { DetailUserComponent } from './pages/detail-user/detail-user.component';
import { SharedModule } from '../../shared/shared.module';
import { UsersService } from './services/users.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListUserComponent,
    DetailUserComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers:[UsersService]
})
export class UsersModule { }
