import { Injectable } from "@angular/core";
import { IRoute } from "../interfaces/route.interface";
import { DISTANCES } from "../constants/route.constants";
import { IOrderedRoute } from "../interfaces/ordered-route.interface";
import { RANGES } from "../constants/route.constants";

@Injectable({
  providedIn: "root"
})
export class SortService {
  constructor() {}

  public sortRoutes(routes: Array<IRoute>): IOrderedRoute {
    return {
      near: {
        routes: routes.filter(site => this.isNear(site.distance)),
        range: RANGES.NEAR
      },
      medium: {
        routes: routes.filter(site => this.isMedium(site.distance)),
        range: RANGES.MEDIUM
      },
      far: {
        routes: routes.filter(site => this.isFar(site.distance)),
        range: RANGES.FAR
      }
    };
  }

  private isNear(distance: number) {
    const { NEAR } = DISTANCES;
    return distance > NEAR.distMin && distance < NEAR.distMax;
  }
  private isMedium(distance: number) {
    const { MEDIUM } = DISTANCES;
    return distance > MEDIUM.distMin && distance < MEDIUM.distMax;
  }
  private isFar(distance: number) {
    const { FAR } = DISTANCES;
    return distance > FAR.distMin && distance < FAR.distMax;
  }
}
