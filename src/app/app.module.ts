import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { ListAllComponent } from './components/list-all/list-all.component';
import { SignupComponent } from './components/signup/signup.component';

import { CookieService } from 'ngx-cookie-service';

import { MatButtonModule, MatTableModule } from '@angular/material';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations" 
import { PortalModule } from '@angular/cdk/portal';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar'
import { SearchPipe } from './components/list-all/search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ListAllComponent,
    SignupComponent,
    SearchPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,

  ],
  exports: [
    PortalModule,
    MatPaginatorModule,
  ],

  providers: [ CookieService ],
  bootstrap: [AppComponent],

})
export class AppModule { }
