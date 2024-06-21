import { Component, OnInit, enableProdMode } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import { Course } from '../../../shared/course';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.scss'
})

export class AddCourseComponent implements OnInit {

  constructor(private data:DataService, private router : Router) { }

  //Creating the form 

  courseForm: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
    duration: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required])
  })

  ngOnInit(): void {
  }

  submitForm()
  {

  
    let course: Course ={
      courseId: 0,
      name : this.courseForm.value.name,
      description : this.courseForm.value.description,
      duration : this.courseForm.value.duration
    }

   this.data.addCourse(course).subscribe((response:any) => {
     this.router.navigate(['/'])

          if(response.statusCode == 200)
          {
            
            alert('Course added successfully');
          }
          else
          {
            alert(response.message);
          }
        });

  }


}