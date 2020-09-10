import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { IRoute } from 'src/calculator/interfaces/route.interface';
import { RouteService } from '../../services/route.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, OnChanges {
  @Input() private report;

  public destinationDistances: Array<IRoute> = [];
  public totals: any = {};
  public hourCalculation: any = {};

  constructor(private routeService: RouteService) {}

  ngOnInit() {}

  ngOnChanges(changes) {
    if (changes.report) {
      this._setResults();
    }
  }

  private _setResults() {
    if (!this.report) {
      return;
    }
    this.destinationDistances = this.report.destinations;
    this.hourCalculation = this.report.hours;
    this.totals = this.report.total;
  }
}
