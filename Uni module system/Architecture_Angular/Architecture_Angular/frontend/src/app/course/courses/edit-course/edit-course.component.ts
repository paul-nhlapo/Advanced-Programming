import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import { Course } from '../../../shared/course';
import { Component, OnInit, enableProdMode } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.scss'
})


export class EditCourseComponent implements OnInit {

  // constructor(private data:DataService, private router : Router) { }
  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  
  courses:Course[] = []
  course: any;
  newCourse: any;
  //Creating the form 

  courseForm: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
    duration: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required])
  })
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dataService.GetCourse(id).subscribe((course: any) => { // Specify the type of 'course' as 'Course'
      this.courseForm.setValue({
        name: course.name,
        duration: course.duration,
        description: course.description
      });
    });
  }

  submitForm()
  {
    this.newCourse = {
      name: this.courseForm.value.name,
      duration: this.courseForm.value.duration,
      description: this.courseForm.value.description
    }
    this.dataService.UpdateCourse(this.newCourse.courseId, this.newCourse).subscribe((course: any) => {
      this.course = course;
    });
    //Then route to the courses page
    // this.router.navigate(['/courses']);

  }


}