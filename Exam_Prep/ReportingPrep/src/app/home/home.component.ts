import { Component } from '@angular/core';
import {Chart, ChartDataset, ChartType} from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
  
})

export class HomeComponent {
  ngOnInit():void{
      this.createChart();
    }
    public chart: any;
    createChart(){
      this.chart = new Chart("barChart",{
        type: 'bar',
        data: {
          labels:['Shirts','Jacket','Men Tops','Men Pants','Swimwear','Shoes','Sleepwear','Men Accessories'],
          datasets:[
            {
              label:"2022",
              data:['446','551','456','158','171','553','566','231'],
              backgroundColor: 'blue'
            },
            {
              label:"2023",
              data:['623','431','525','306','100','369','417','420'],
              backgroundColor:'red'
            }
          ]
        }
      });
    }
        
  }
  
  
    
  
  
