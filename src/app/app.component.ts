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
  doughnutLeft = [];
  doughnutRight = [];

  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('canvas1') canvas1: ElementRef;
  @ViewChild('canvas2') canvas2: ElementRef;


  constructor(private _knowledgeBeforeAfter: KnowledgeBeforeAfterService) {}

  createRangeLabels() {
    return R.range(0, 20).map(i => `${(i * 5) + 1} - ${(i + 1) * 5}`).reverse();
  }

  ngOnInit() {
    this._knowledgeBeforeAfter.getData()
    .subscribe(res => {

      const ctx = this.canvas.nativeElement.getContext('2d');

      const chartData = {
        labels: this.createRangeLabels(),
        datasets: [{
          label: '# of Participants',
          data: res,
          borderWidth: 1
        }]
      };

      this.doughnutLeft = new Chart(ctx, {
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

      this.doughnutRight = new Chart(ctx, {
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
