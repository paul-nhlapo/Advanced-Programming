import { Component } from '@angular/core';
import {Chart, ChartDataset, ChartType} from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent {

  ngOnInit():void{
    this.createChart();
  }
  public chart: any;
  createChart(){
    this.chart = new Chart("pie-chart",{
      type: 'pie',
      data: {
        labels:['Shirts','Jacket','Men Tops','Men Pants','Swimwear','Shoes','Sleepwear','Men Accessories'],
        datasets:[
          {
            label:"2022",
            data:['446','551','456','158','171','553','566','231'],
          },
          {
            label:"2023",
            data:['623','431','525','306','100','369','417','420'],
          }
        ]
      }
    });
  }
 
}
