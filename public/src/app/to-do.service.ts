import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  tasks = new BehaviorSubject([]);
  
  constructor(private _http: HttpClient) { }

  // create a new user
  addUser(newUser: any){
    // console.log("In the service to create a new User", newUser);
    return this._http.post('/user', newUser);
  }

  // login a User
  loginUser(userCredentials: any){
    // console.log("In the service and login", userCredentials['email'], "AND THE PASSWORD", userCredentials['password']);
    return this._http.post('/login/', userCredentials, { withCredentials: true });
  }

  // show all tasks
  getAllTasks(){
    console.log("Get all from the service");
    return this._http.get('/tasks');
  }
  
  // create a new task
  createTask(newTask: {}){
    console.log("Lets create this task from the server", newTask);
    return this._http.post('/task/new', newTask);
  }

  // delete a specific Task
  deleteTask(taskID){
    console.log("in the service to delete the task", taskID);
    return this._http.delete('/delete/task/' + taskID);
  }
  
  // edit a Task
  updateTask(editTask, id){
    console.log("in the service to edit the task", editTask);
    return this._http.put('/task/edit/' + id, editTask);
  }
  
  logout(){
    console.log("In the service to logout");
    return this._http.get('/user/logout');
  }
}
