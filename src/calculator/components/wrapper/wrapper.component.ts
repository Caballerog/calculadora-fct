import { Component, OnInit } from '@angular/core';
import {
  FormRoute,
  RouteParams
} from 'src/calculator/interfaces/route.interface';

import { MatSnackBar } from '@angular/material/snack-bar';
import { RouteService } from '../../services/route.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent implements OnInit {
  public validDestination: boolean;

  constructor(
    private routeService: RouteService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  formData: FormRoute;
  report: any;

  private command = {
    addRoute: this.addRoute.bind(this),
    deleteRoute: this.deleteRoute.bind(this),

    execute: function(action) {
      this[action]();
    }
  };

  public receiveFormData(route: RouteParams) {
    const { formRoute, action } = route;
    this.formData = formRoute;
    this.generateResults(action);
  }

  private async generateResults(action: string) {
    this.validDestination = false;
    this.command.execute(action);
  }

  private async addRoute() {
    try {
      await this.calculateRoute();
      this.validDestination = true;
      this.report = await this.routeService.generateReport();
      //mapservice. setMarker = this.report.destinations
    } catch (error) {
      this.showError(error);
    }
  }

  private async deleteRoute() {
    this.routeService.deleteRoute(this.formData);
    this.report = await this.routeService.generateReport();
  }

  private async calculateRoute(): Promise<any> {
    return this.routeService.calculateRoute(this.formData);
  }

  private showError(error: Error) {
    this.snackBar.open(error.message, 'Error', {
      duration: 4000
    });
  }
}
