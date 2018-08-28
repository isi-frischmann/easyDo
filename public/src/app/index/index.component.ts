import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../to-do.service';
import { userInfo } from 'os';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  tasks = [];
  newTask = {};
  editTask: any;

  constructor(private _toDoService: ToDoService, private router: Router) {
   }

  ngOnInit() {
    this.getAll();
  }

  getAll(){
    const showObservable = this._toDoService.getAllTasks();
    console.log("I'm showing all the tasks in the component");
    showObservable.subscribe(res => {
      this.tasks = res['task'];
      console.log("those are the tasks", this.tasks);
    })
  }

  deleteTask(taskID){
    const deleteObserv = this._toDoService.deleteTask(taskID);
    deleteObserv.subscribe(res => {
      this.getAll();
    })
  }

  // button to edit a task
  onEdit(task){
    console.log("Button clicked for editting", task);
    this.editTask = task;
  }

  logout(){
    console.log("In the component for logout", );
    const logoutObserv = this._toDoService.logout();
    logoutObserv.subscribe(res => {
      this.router.navigate(['**']);
    })
  }

  // updateTaskIndex(){
  //   this.getAll();
  // }

}
