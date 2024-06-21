import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './course/courses/courses.component';
import { AddCourseComponent } from './course/courses/add-course/add-course.component';
import { EditCourseComponent } from './course/courses/edit-course/edit-course.component';

const routes: Routes = [
  {path: 'courses', component: CoursesComponent},  
  {path: '', redirectTo: '/courses', pathMatch: 'full'},
  {path: 'add-course', component: AddCourseComponent},
  {path: 'edit-course/:id', component: EditCourseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
