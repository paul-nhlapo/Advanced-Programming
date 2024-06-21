import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js'


@Component({
  selector: 'app-bar-line',
  templateUrl: './bar-line.component.html',
  styleUrls: ['./bar-line.component.scss']
})
export class BarLineComponent {

  ngOnInit():void{
    this.createChart();
  }
  public chart: any;
  createChart(){
    this.chart = new Chart("bar-line",{
      type: 'line',
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
