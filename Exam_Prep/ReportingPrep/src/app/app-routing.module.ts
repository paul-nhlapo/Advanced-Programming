import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BarLineComponent } from './bar-line/bar-line.component';



const routes: Routes = [
  { path: "app-home", component: HomeComponent},
  { path: "pie-chart", component: PieChartComponent},
  { path: "bar-line", component: BarLineComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
