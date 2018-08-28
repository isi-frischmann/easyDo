import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToDoService } from '../to-do.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  @Input() editTask: any;
  @Input() tasks: any;
  @Output() savedTask = new EventEmitter();
  updatedTask: any;



  constructor(private _toDoService: ToDoService, private _route: ActivatedRoute, private _router: Router) {
  }

  ngOnInit() {
    this.updatedTask= {
      task: "",
      description: "",
      date: ""
    }
  }

  // update Task
  updateTask(editTask){
    console.log("i'm in the edit component to update your task", this.updatedTask);
    const updateObserv = this._toDoService.updateTask(this.updatedTask, editTask._id);
    console.log("Updated task", this.updatedTask);
    updateObserv.subscribe((updatedTask) => {
      console.log("in the edit component and updated", updatedTask);
      this.savedTask.emit();
    })
  }
}
