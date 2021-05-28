import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { PageEvent } from '@angular/material/paginator';
import { toInteger } from 'lodash';

@Component({
  selector: 'app-list-all',
  templateUrl: './list-all.component.html',
  styleUrls: ['./list-all.component.css']
})

export class ListAllComponent implements OnInit, OnDestroy {

  username="";
  aa:boolean=false;

  AllUser: any[] = [];

  paginationLength:any;

  setIndex(ii:any){
    this.aa=ii;
  }

  time = new Date();
  intervalId:any; 

  users: any[] = [];

    currentUser = null;
    currentIndex = -1;

    cookie={
      token:'',
    }

    data={
      name:''
    };

    HighlightRow : any;  
    ClickedRow:any;  
    pos:any;
    submitted=false;

    form: FormGroup;
    sel:String="";
    dep:any;
    mySelect = [];
    invalid=false;

    ngOnInit(): void {
      this.cookie.token=this.cookieService.get('token');
      this.cookie.token=this.cookie.token.concat('-0');
      console.log(this.cookie.token);

      if(this.cookie.token==''){
        this.location.back();
      }else{
      this.readUsers();
      this.readDepartment();
      this.searchbByName();

      this.intervalId = setInterval(() => {
        this.time = new Date();
      }, 1000);
      }

    }

    constructor(private userService: UserService,private formBuilder: FormBuilder,private location: Location,private cookieService: CookieService){ 


    this.form = this.formBuilder.group({
      dep: ['']
    });

  this.ClickedRow = function(index:any){  
    this.HighlightRow = index;  
    this.pos = index;
    this.invalid=false; 
    this.submitted=true;     
  }

  }

    readUsers(): void {
      this.userService.readAllUsers(this.cookie)
        .subscribe(
          data => {
            console.log(data)
            this.AllUser = data;
            this.paginationLength=this.AllUser.length;
            this.users=this.AllUser.slice(0,10);
          },
          error => {
            console.log(error);
          });
    }

    refresh(): void {
      this.readUsers();
      this.readDepartment();
      this.currentUser = null;
      this.currentIndex = -1;
    }

    setCurrentUser(data:any, index:any): void {
      this.currentUser = data;
      this.currentIndex = index;
    }

    searchbByName():void{
      const username=this.cookieService.get('username');
      this.userService.searchByName(username)
        .subscribe(
          response => {
            this.data.name=response.name;
          },
          error => {
            console.log(error);
          }
        )
    }

    logout():void{
        this.userService.logout(this.cookie)
          .subscribe(
            response => {
              if(response.is_active==false){
                this.location.back();
                this.cookieService.deleteAll();
              }
            },
            error => {
              console.log(error);
            });
    }  

    closeData():void{
      this.submitted=false;
      this.invalid=false;
    }

    readDepartment(): void {
      this.userService.readAllDepartment()
        .subscribe(
          position => {
              this.dep = position;
          },
          error => {
            console.log(error);
          });
    }
    
    selectChange(event:any) {
        this.sel=event.target.value;
        this.invalid=true;
    }

    saveDepartment():void{
      if(!(this.sel=="")){
        const data={
          name:this.users[this.pos].name,
          department:this.sel
        }
        console.log(data)
        this.userService.addDept(data)
          .subscribe(
            response => {
                this.submitted=false;
                this.invalid=false;
                this.refresh();        
            },
            error => {
              console.log(error);
            });

    }
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  loadPagination(index:string){
    this.cookie.token=this.cookieService.get('token').concat('-',index);
    this.readUsers();
    console.log(this.cookie.token);

  }

  // onChangePage(pe:PageEvent) {
  //   if(pe.pageIndex==0){
  //   const start=pe.pageIndex.toString();
  //   const end=pe.pageIndex+10;
  //   this.users=this.AllUser.slice(toInteger(start) ,end);
  //   }else{
  //   const start=pe.pageIndex.toString()+0;
  //   const end=toInteger(start)+10;
  //   this.users=this.AllUser.slice(toInteger(start),end);
  //   }

  // }
}
