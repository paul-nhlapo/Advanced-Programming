import { Component } from '@angular/core';
import { Chart, ChartDataset, ChartType } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  ngOnInit(): void {
    this.createChart(); // Call the createChart() method when the component is initialized
  }

  public chart: any;

  createChart() {
    this.chart = new Chart("barChart", { // Create a new Chart instance with the ID "barChart"
      type: 'bar', // Set the chart type to bar
      data: {
        labels: ['Shirts', 'Jacket', 'Men Tops', 'Men Pants', 'Swimwear', 'Shoes', 'Sleepwear', 'Men Accessories'], // Set the labels for the x-axis
        datasets: [
          {
            label: "2022", // Set the label for the first dataset
            data: ['446', '551', '456', '158', '171', '553', '566', '231'], // Set the data values for the first dataset
            backgroundColor: 'blue' // Set the background color for the bars in the first dataset
          },
          {
            label: "2023", // Set the label for the second dataset
            data: ['623', '431', '525', '306', '100', '369', '417', '420'], // Set the data values for the second dataset
            backgroundColor: 'red' // Set the background color for the bars in the second dataset
          }
        ]
      }
    });
  }
}
