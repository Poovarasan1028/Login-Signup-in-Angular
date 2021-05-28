import { Component, OnInit } from '@angular/core';
import { UserService} from 'src/app/services/user.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  users = {
    name: '',
    email: '',
    username: '',
    password: '',
    phone: '',   
    position: '',
    available: false
  };
  submitted = false;

  pos : any;
  form: FormGroup;

  sel : String='';
  mySelect = [];
  selectedValue: any;
  angForm: FormGroup;

  constructor(private userService: UserService,private formBuilder: FormBuilder,private router: Router,private location: Location) { 
    this.form = this.formBuilder.group({
      pos: ['']
    });

    this.angForm = this.formBuilder.group({
      name: ['', Validators.required ],
      email: ['', Validators.required ],
      username: ['', Validators.required ],
      password: ['', Validators.required ],
      phone: ['', Validators.required ],
      position: ['', Validators.required ]

   });
  
  }

  ngOnInit(): void {
    this.readPositions();
  }

  createUser(): void {
    const data = {
      name: this.users.name,
      email: this.users.email,
      username: this.users.username,
      password: this.users.password,
      phone: this.users.phone, 
      position: { id : this.sel,
                  name : this.users.name }  
                  
    };

      this.userService.createUsers(data)
        .subscribe(
          response => {
            this.submitted = true;
          },
          error => {
            console.log(error);
          });

          console.log(data);
  }

  readPositions(): void {
    this.userService.readAllPosition()
      .subscribe(
        position => {
            this.pos = position;
        },
        error => {
          console.log(error);
        });
  }
  
  selectChange(event:any) {
      this.sel=event.target.value;
  }

  back():void{
    this.submitted=false;
    this.location.back();
  }

}