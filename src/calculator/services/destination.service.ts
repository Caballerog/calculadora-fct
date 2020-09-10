import { DESTINATION_REQUEST } from '../constants/destination.constants';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { ORIGIN } from '../constants/route.constants';

@Injectable({
  providedIn: 'root',
})
export class DestinationService {
  constructor(private httpService: HttpService) {}

  public async getDestinationInfo(coordinates: string) {
    const request = this._generateRequest(coordinates);
    const response = await this.httpService.get(request);

    if (!response.routes[0]) {
      throw new Error('No se ha encontrado el destino');
    }

    return response;
  }

  public getDistance(googleApiResponse: any) {
    return googleApiResponse.routes[0].legs[0].distance.value / 1000;
  }
  public getRoutePolyline(googleApiResponse: any) {
    return googleApiResponse.routes[0].overview_polyline.points;
  }

  private _generateRequest(coordinates: string) {
    //const cors = "https://cors-anywhere.herokuapp.com/";
    const cors = '';
    return `${cors}${DESTINATION_REQUEST.ENDPOINT}${DESTINATION_REQUEST.OUTPUT_FORMAT}origin=${ORIGIN}&destination=${coordinates}&key=${DESTINATION_REQUEST.APIKEY}`;
  }
}
