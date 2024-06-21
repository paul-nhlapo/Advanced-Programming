import { Component } from '@angular/core';
import { Chart, ChartDataset, ChartType } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent {

  ngOnInit(): void {
    this.createChart(); // Call the createChart() method when the component initializes
  }

  public chart: any;

  createChart() {
    this.chart = new Chart("pie-chart", { // Create a new Chart instance with the ID "pie-chart"
      type: 'pie', // Set the chart type to 'pie'
      data: {
        labels: ['Shirts', 'Jacket', 'Men Tops', 'Men Pants', 'Swimwear', 'Shoes', 'Sleepwear', 'Men Accessories'], // Set the labels for the chart
        datasets: [
          {
            label: "2022", // Set the label for the first dataset
            data: ['446', '551', '456', '158', '171', '553', '566', '231'], // Set the data for the first dataset
          },
          {
            label: "2023", // Set the label for the second dataset
            data: ['623', '431', '525', '306', '100', '369', '417', '420'], // Set the data for the second dataset
          }
        ]
      }
    });
  }

}
