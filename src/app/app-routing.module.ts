import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component'
import {DashboardComponent} from './home/dashboard/dashboard.component';
import { UsersComponent } from './user-component/users/users.component';
import { RolesComponent } from './role-component/roles/roles.component';
import { HomeComponent } from './home/home.component';
import { AddUserComponent } from './user-component/add-user/add-user.component';
import { ParentUserComponent } from './user-component/user-component.component';
import { ParentUserRoleComponent } from './user-role-component/parent-user-role.component';
import { ParentRoleComponent } from './role-component/parent-role.component';
import { AddUserRoleComponent } from './user-role-component/add-user-role/add-user-role.component';
import { UserRolesComponent } from './user-role-component/user-roles/user-roles.component';
import { AddRoleComponent } from './role-component/add-role/add-role.component';
import { EditRoleComponent } from './role-component/edit-role/edit-role.component';
import { EditUserRoleComponent } from './user-role-component/edit-user-role/edit-user-role.component';
import { EditUserComponent } from './user-component/edit-user/edit-user.component';
import { AuthGuard } from './customServices/auth-guard';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent,
  children: [     
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {   
    path: 'userComponent',
    component: ParentUserComponent, canActivate: [AuthGuard],
    children:[
      { path: '', redirectTo: 'user', pathMatch: 'full' },
      { path: 'user', component:UsersComponent },
      { path: 'addUser', component:AddUserComponent },
      { path: 'editUser', component:EditUserComponent },
    ]
  },
  
  {
    path: 'rolesComponent',
    component: ParentRoleComponent,
    children:[
      { path: '', redirectTo: 'role', pathMatch: 'full' },
      { path: 'role', component:RolesComponent },
      { path: 'addRole', component:AddRoleComponent },
      { path: 'editRole', component:EditRoleComponent }
    ]
  },
  {
    path: 'userRolesComponent',
    component: ParentUserRoleComponent,
    children:[
      { path: '', redirectTo: 'userRoles', pathMatch: 'full' },
      { path: 'userRoles', component:UserRolesComponent },
      { path: 'addUsereRole', component:AddUserRoleComponent },
      { path: 'editUsereRole', component:EditUserRoleComponent },
    ]
  },

  


]
},
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
