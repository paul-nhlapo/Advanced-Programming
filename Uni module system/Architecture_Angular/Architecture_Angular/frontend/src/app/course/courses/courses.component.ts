import { Component, OnInit } from '@angular/core';
import { Course } from '../../shared/course';
import { DataService } from '../../services/data.service';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {


  courses:Course[] = []
  course: any;
  newCourse: any;

  constructor(private dataService: DataService, private router: Router) { }
  // constructor(private data:DataService, private router : Router) { }


  ngOnInit(): void {
    this.GetCourses()
    // console.log(this.courses)
  }

  GetCourses()
  {
    this.dataService.GetCourses().subscribe(result => {
      let courseList:any[] = result
      courseList.forEach((element) => {
        this.courses.push(element)
      });
    })
  }

  deleteCourse(courseId: Number)
{
  this.dataService.DeleteCourse(courseId).subscribe((response:any) => {
    if(response.statusCode == 200)
    {
      this.GetCourses();
    }
    else
    {
      alert(response.message)
    }
  })
}
editCourse(id: Number) {
  this.router.navigate(['/edit-course', id]);
}
}


