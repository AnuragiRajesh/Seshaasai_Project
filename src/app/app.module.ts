import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideWarComponent } from './home/dashboard/side-war/side-war.component';
import { NavBarComponent } from './home/dashboard/nav-bar/nav-bar.component';
import { SummaryComponent } from './home/dashboard/Summary/summary.component';
import { TableComponent } from './home/dashboard/table/table.component';
import { MaterialModule } from './MaterialModule';
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { UsersComponent } from './user-component/users/users.component';
import { RolesComponent } from './role-component/roles/roles.component';
import { UserRolesComponent } from './user-role-component/user-roles/user-roles.component';
import { AddUserComponent } from './user-component/add-user/add-user.component';
import { ParentUserComponent } from './user-component/user-component.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ParentUserRoleComponent } from './user-role-component/parent-user-role.component';
import { AddUserRoleComponent } from './user-role-component/add-user-role/add-user-role.component';
import { ParentRoleComponent } from './role-component/parent-role.component';
import { AddRoleComponent } from './role-component/add-role/add-role.component';
import { EditRoleComponent } from './role-component/edit-role/edit-role.component';
import { EditUserRoleComponent } from './user-role-component/edit-user-role/edit-user-role.component';
import { EditUserComponent } from './user-component/edit-user/edit-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './pop-ups/dailog-box/dialog.component';
import { CommonModule } from '@angular/common';
import { FormValidatorDirective } from './form-validator.directive';
import { ToastComponent } from './pop-ups/toast/toast.component';
import { TokenunterceptorService } from './customServices/tokenunterceptor.service';
@NgModule({
  declarations: [
    AppComponent,
    SideWarComponent,
    NavBarComponent,
    SummaryComponent,
    LoginComponent,
    TableComponent,
    HomeComponent,
    DashboardComponent,
    UsersComponent,
    RolesComponent,
    DialogComponent,
    UserRolesComponent,
    AddUserComponent,
    ParentUserComponent,
    ParentUserRoleComponent,
    AddUserRoleComponent,
    ParentRoleComponent,
    AddRoleComponent,
    EditRoleComponent,
    EditUserRoleComponent,
    EditUserComponent,
    FormValidatorDirective,
    ToastComponent,
  ],
  imports: [
    AppRoutingModule,
    MaterialModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    MatDialogModule,
    NgbModalModule,
    CommonModule,
    ReactiveFormsModule,




  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenunterceptorService, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule { }
