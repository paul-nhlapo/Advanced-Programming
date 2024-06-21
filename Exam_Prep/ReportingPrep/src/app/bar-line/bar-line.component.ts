import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js'

@Component({
  selector: 'app-bar-line',
  templateUrl: './bar-line.component.html',
  styleUrls: ['./bar-line.component.scss']
})
export class BarLineComponent {

  ngOnInit(): void {
    this.createChart(); // Call the createChart() method when the component is initialized
  }

  public chart: any;

  createChart() {
    this.chart = new Chart("bar-line", { // Create a new Chart instance with the ID "bar-line"
      type: 'line', // Set the chart type to line
      data: {
        labels: ['Shirts', 'Jacket', 'Men Tops', 'Men Pants', 'Swimwear', 'Shoes', 'Sleepwear', 'Men Accessories'], // Set the labels for the x-axis
        datasets: [
          {
            label: "2022", // Set the label for the first dataset
            data: ['446', '551', '456', '158', '171', '553', '566', '231'], // Set the data for the first dataset
          },
          {
            type: 'bar', // Set the chart type to bar for the second dataset
            label: "2023", // Set the label for the second dataset
            data: ['623', '431', '525', '306', '100', '369', '417', '420'], // Set the data for the second dataset
          }
        ]
      }
    });
  }
}
