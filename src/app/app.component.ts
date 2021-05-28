import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'User App';

  token:any;

  detail={
    username: '',
    password: ''
  }
  
  submitted = false;
  view=true;

  constructor(private userService: UserService,public router: Router,private location: Location,private cookieService: CookieService,private dialog: MatDialog) {  }

  ngOnInit(): void {
  }

  openSignup():void{
    this.view=false;
    this.router.navigate(['/signup']);
  }

  check(): void {
      this.userService.login(this.detail)
        .subscribe(
          response => {
            console.log(response)
            if(response.is_active==true){
              this.view=false;
              this.submitted=false;
              this.detail.username="";
              this.detail.password="";
              this.cookieService.set( 'token', response.token );
              this.cookieService.set( 'username', response.username );
              this.router.navigate(['/listall']);
            }else{
              this.submitted=true;
              this.detail.password="";
            }
          },
          error => {
            console.log(error);
          });
  }

  

}