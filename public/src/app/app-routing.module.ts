import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditTaskComponent } from './edit-task/edit-task.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { IndexComponent } from './index/index.component';

// create the path for each component
const routes: Routes = [
  { path: 'task/:task_id/edit/:task', component: EditTaskComponent},
  { path: 'task/new', component: CreateTaskComponent},
  { path: 'task', component: IndexComponent, data:{requiresLogin: true}},
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent, data:{requiresLogin: true}},
  { path: '**', component: MainComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



