import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { KnowledgeBeforeAfterService } from './knowledge_before_after.service';
import { Chart } from 'chart.js';

import * as R from 'ramda';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  chart = [];
  barChart = [];
  doughnutLeft = [];
  doughnutRight = [];
  lineChart = [];

  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('canvasBar') canvasBar: ElementRef;
  @ViewChild('canvasLine') canvasLine: ElementRef;
  @ViewChild('canvasDoughbutLeft') canvasDoughbutLeft: ElementRef;
  @ViewChild('canvasDoughbutRight') canvasDoughbutRight: ElementRef;


  constructor(private _knowledgeBeforeAfter: KnowledgeBeforeAfterService) {}

  createRangeLabels() {
    return R.range(0, 20).map(i => `${(i * 5) + 1} - ${(i + 1) * 5}`).reverse();
  }

  ngOnInit() {
    this._knowledgeBeforeAfter.getData()
    .subscribe(res => {

      const chartData = {
        labels: this.createRangeLabels(),
        datasets: [{
          label: '# of Participants',
          data: res,
          borderWidth: 1
        }]
      };

      const ctxBar = this.canvasBar.nativeElement.getContext('2d');

      this.barChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
          labels: ["Before Course", "After Course"],
          datasets: [
            {
              label: "% Knowledge",
              data: [40, 90],
              backgroundColor: [
                "rgba(211, 216, 0)",
                "rgba(116, 192, 153)" // Mint
              ],
              borderWidth: 0
            }
          ]
        },
        options: {
          scales: {
              "yAxes": [{"ticks": { "beginAtZero": true, "max": 100}}]
            }
        }
      });

      const ctxLine = this.canvasLine.nativeElement.getContext('2d');

      this.lineChart = new Chart(ctxLine, {
        type: 'line',
        data: {
          labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
          datasets: [{
            label: "Attendance %",
            backgroundColor: "rgba(21, 147, 105, 0.8)",
            fill: true,
            data: [100, 80, 75, 80, 75, 40, 85, 90, 92, 95, 90],
            lineTension: 0
          },
          {
            label: "Threashold",
            borderColor: "rgba(255, 102, 102, 0.8)",
            data: [90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90],
            radius: 0,
            fill: false,
            lineTension: 0
          }]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            "yAxes": [{"ticks": { "beginAtZero": true, "max": 100}}],
            "xAxes": [{scaleLabel:{display:true,labelString:'Week'}}]
          }
        }
      });

      const ctxLeft = this.canvasDoughbutLeft.nativeElement.getContext('2d');

      this.doughnutLeft = new Chart(ctxLeft, {
        type: 'doughnut',
        data: {
          labels: ["Workers", "Supervisors", "Managers"],
          datasets: [
            {
              label: "% Workers",
              data: [40, 25, 10],
              backgroundColor: [
                "rgba(116, 192, 153)", // Mint
                "rgba(255, 102, 102)",
                "rgba(0, 60, 65)" // dark blue
              ],
              borderColor: [
                "rgba(116, 192, 153)",
                "rgba(54, 162, 235, 1)",
                "rgba(0, 60, 65)"
              ],
              borderWidth: 0
            }
          ]
        }
      });

      const ctxRight = this.canvasDoughbutRight.nativeElement.getContext('2d');

      this.doughnutRight = new Chart(ctxRight, {
        type: 'doughnut',
        data: {
          labels: ["Enrolled in this course", "Not enrolled"],
          datasets: [
            {
              label: "% Enrolled",
              data: [60, 40],
              backgroundColor: [
                "rgba(116, 192, 153)", // Mint
                "rgba(0, 60, 65)" // dark blue
              ],
              borderColor: [
                "rgba(116, 192, 153)", // Mint
                "rgba(0, 60, 65)" // dark blue
              ],
              borderWidth: 1
            }
          ]
        }
      });

      const ctx = this.canvas.nativeElement.getContext('2d');

      this.chart = new Chart(ctx, {
        type: 'horizontalBar',
        data: chartData,
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }]
          }
        }
      })
    })
  }
}
