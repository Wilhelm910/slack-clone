import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { LoginDialogComponent } from './components/auth/login-dialog/login-dialog.component';
import { ForgotPasswordDialogComponent } from './components/auth/forgot-password-dialog/forgot-password-dialog.component';
import { SignUpDialogComponent } from './components/auth/sign-up-dialog/sign-up-dialog.component';

const routes: Routes = [
  // { path: '', redirectTo: 'auth/login', pathMatch: 'full'},
  // { path: '', redirectTo: 'project/tasks', pathMatch: 'full'},
  { 
    path: '', component: AuthComponent, children: [
      { path: 'auth/login', component: LoginDialogComponent},
      { path: 'auth/forgotPassword', component: ForgotPasswordDialogComponent},
      { path: 'auth/signup', component: SignUpDialogComponent}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
