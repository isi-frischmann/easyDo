import { Component, OnInit, Input } from '@angular/core';
import { ToDoService } from '../to-do.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  @Input() newTask: any;

  constructor(private _toDoService: ToDoService, private router: Router) { }

  ngOnInit() {
    this.newTask = {
      task: "",
      date: "",
      desc: ""
    }
  }

  addTask(){
    console.log("I'm in the ts file to create a new Task");
    let newTaskObserv = this._toDoService.createTask(this.newTask);
    newTaskObserv.subscribe((res) => {
      if (res['message'] == "Task can't be created as the date is in the past. It needs to be in the future"){
        alert("Task can't be created as the date is in the past. It needs to be in the future");
      }
      else if (res['message'] === "Task is created"){
      console.log("THAT the response----------", res)
      this.newTask = {task: "", date: "", desc:""};
      }
    this.router.navigate(['task']);
  })
  }
}
