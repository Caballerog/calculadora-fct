import * as polyUtil from 'polyline-encoded';

import { DISTANCES, ORIGIN, PRICE_PER_KM } from '../constants/route.constants';
import { FormRoute, IRoute } from '../interfaces/route.interface';

import { IOrderedRoute } from '../interfaces/ordered-route.interface';
import { Injectable } from '@angular/core';
import { MapService } from '../services/map.service';
import { SortService } from './sort.service';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private calculatedRoutes: Array<IRoute> = [];

  constructor(
    private sortService: SortService,
    private mapService: MapService
  ) {}

  public async calculateRoute(route: FormRoute) {
    const calculatedRoute = await this.getCalculatedRoute(route);
    this.calculatedRoutes = [...this.calculatedRoutes, calculatedRoute];
  }

  public deleteRoute(route: FormRoute) {
    this.calculatedRoutes = this.calculatedRoutes.filter(
      (calculatedRoute: IRoute) =>
        calculatedRoute.destination !== route.destination
    ); //Add unique ID
  }

  public async generateReport(): Promise<any> {
    const hourCalculation = this.getHours(this.calculatedRoutes);

    return {
      destinations: this.calculatedRoutes,
      hours: hourCalculation,
      total: {
        distance: this.calculateTotalDistance(this.calculatedRoutes).toFixed(2),
        cost: this.calculateTotalCost(this.calculatedRoutes),
        hours: this.calculateTotalHours(hourCalculation)
      }
    };
  }

  public async getCalculatedRoute(route: FormRoute): Promise<IRoute> {
    const { destination, timesVisited } = route;
    const {
      coordinates,
      routePolyline,
      distance
    } = await this.mapService.getDestinationInformation(destination);

    return {
      startPoint: ORIGIN,
      endPoint: coordinates,
      route: this.decodePolyline(routePolyline),
      distance,
      cost: this.calculateCost(distance * 2, timesVisited),
      destination,
      timesVisited
    };
  }

  /* private getCalculatedRoutes(routes: Array<FormRoute>): Promise<IRoute[]> {
    return Promise.all(
      routes.map(async (route: IRoute) => {
        const distance = await this.mapService.getDistance(route.destination);
        return {
          startPoint: ORIGIN,
          distance,
          cost: this.calculateCost(distance),
          destination: route.destination,
          timesVisited: route.timesVisited
        };
      })
    );
  } */
  private decodePolyline(polyline: string): any[] {
    return polyUtil.decode(polyline);
  }

  private calculateCost(distance: number, timesVisited: number): string {
    return (distance * timesVisited * PRICE_PER_KM).toFixed(2);
  }

  private calculateTotalCost(routes: Array<IRoute>): string {
    const totalDistance = this.calculateTotalDistance(routes);
    return this.calculateCost(totalDistance, 1);
  }

  private calculateTotalDistance(routes: Array<IRoute>): number {
    return (
      routes.reduce(
        (totalKm: number, route: IRoute) =>
          route.distance * route.timesVisited + totalKm,
        0
      ) * 2
    );
  }

  private calculateTotalHours(hourCalculation: IOrderedRoute): number {
    const routes = Object.values(hourCalculation);
    return routes.reduce((acc: any, act: any) => acc + act.hoursGiven, 0);
  }

  private getHours(routes: Array<IRoute>): IOrderedRoute {
    const orderedRoutes = this.sortService.sortRoutes(routes);
    return this.calculateHours(orderedRoutes);
  }

  private calculateHours(routes: IOrderedRoute): IOrderedRoute {
    const { near, medium, far } = routes;
    return {
      near: {
        routes: near.routes,
        range: near.range,
        hoursGiven: DISTANCES.NEAR.businessNum[near.routes.length]
      },
      medium: {
        routes: medium.routes,
        range: medium.range,
        hoursGiven: DISTANCES.MEDIUM.businessNum[medium.routes.length]
      },
      far: {
        routes: far.routes,
        range: far.range,
        hoursGiven: DISTANCES.FAR.businessNum[far.routes.length]
      }
    };
  }
}
