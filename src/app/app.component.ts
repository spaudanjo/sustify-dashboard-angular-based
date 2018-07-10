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

  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('canvasBar') canvasBar: ElementRef;
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
