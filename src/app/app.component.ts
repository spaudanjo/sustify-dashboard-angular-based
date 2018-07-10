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
  @ViewChild('canvas') canvas: ElementRef;

  
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
