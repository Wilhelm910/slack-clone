import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { LoginDialogComponent } from './components/auth/login-dialog/login-dialog.component';
import { ForgotPasswordDialogComponent } from './components/auth/forgot-password-dialog/forgot-password-dialog.component';
import { SignUpDialogComponent } from './components/auth/sign-up-dialog/sign-up-dialog.component';
import { MainComponent } from './components/main/main/main.component';
import { ChannelDetailComponent } from './components/main/channel-detail/channel-detail.component';
import { ContentComponent } from './components/main/content/content.component';

const routes: Routes = [
  // { path: '', redirectTo: 'auth/login', pathMatch: 'full'},
  {
    path: '', component: AuthComponent, children: [
      { path: 'auth/login', component: LoginDialogComponent },
      { path: 'auth/forgotPassword', component: ForgotPasswordDialogComponent },
      { path: 'auth/signup', component: SignUpDialogComponent }
    ]
  },

  {
    path: 'main', component: MainComponent, children: [
      { path: 'channel/:id', component: ChannelDetailComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
