import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../to-do.service';
import { ObjectUnsubscribedError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userCredentials: any;
  sessionID: "";

  constructor(private _toDoService: ToDoService,
    private router: Router) { }

  ngOnInit() {
    this.userCredentials = { email: "", password: ""};
  }

  loginSubmit(userCredentials){
    console.log("The user can login now", userCredentials.email);
    // console.log("Session:", userCredentials) 
    let observable = this._toDoService.loginUser(this.userCredentials);
    observable.subscribe(data => {
      console.log("we are getting this back", data);
      if (data['message'] === "No User exist in DB"){
        alert("User doesn't exist");
        return;
      }
      else if (data['message'] === "Login failed") {
        alert('Login failed');
        console.log("Login failed");
        return;
      }
      else if (data['message'] === "OK login") {
        
        console.log("LOGGED DATA", data);
        this.sessionID = data['user']['_id'];
        console.log("SESSION:", this.sessionID);
        this.router.navigate(['task']); 
      }
    })
  }

}
