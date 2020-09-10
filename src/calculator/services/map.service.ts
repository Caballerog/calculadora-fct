import { Injectable } from "@angular/core";
import { GeoCodingService } from "./geo-coding.service";
import { DestinationService } from "./destination.service";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root"
})
export class MapService {
  constructor(
    private geoCodingService: GeoCodingService,
    private destinationService: DestinationService
  ) {}

  public async getDestinationInformation(destination: string) {
    const coordinates = await this.geoCodingService.getCoordinates(destination);
    const routeInfo = await this.destinationService.getDestinationInfo(
      coordinates
    );
    return {
      coordinates,
      distance: this.destinationService.getDistance(routeInfo),
      routePolyline: this.destinationService.getRoutePolyline(routeInfo)
    };
  }
}
