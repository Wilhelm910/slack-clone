import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { LoginDialogComponent } from './components/auth/login-dialog/login-dialog.component';
import { SignUpDialogComponent } from './components/auth/sign-up-dialog/sign-up-dialog.component';
import { ForgotPasswordDialogComponent } from './components/auth/forgot-password-dialog/forgot-password-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginDialogComponent,
    SignUpDialogComponent,
    ForgotPasswordDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
