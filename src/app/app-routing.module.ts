import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', 
    component: LayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./component/dashboard/dashboard.module').then((m) => m.DashboardModule) }
    ],
  },
  { path: 'users', 
    component: LayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./component/users/users.module').then((m) => m.UsersModule) }
    ],
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
