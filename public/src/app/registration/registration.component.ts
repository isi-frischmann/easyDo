import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../to-do.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  
  newUser: any;

  constructor(private _toDoService: ToDoService, private router: Router ) { }

  ngOnInit() {
    this.newUser = {
      fname: "",
      lname: "",
      email: "",
      password: "",
      c_pw: ""
    }
  }

  addUser(){
    console.log("Creating a new User in reg.component.ts");
    let newObserv = this._toDoService.addUser(this.newUser);
    newObserv.subscribe((res) => {
      this.newUser = {fname: "", lname: "", email: "", password: ""};
      console.log("That is the response from the reg.ts", res);
  
      if (res['message'] === "Email already exists"){
        alert('Email address already exists');
        return;
      }
      else if( res['message'] === "Error with creating a new user"){
        alert('Can not create a new user');
        return;
      }
      else{
        this.router.navigate(['task']);
      }

    })
  }
}
