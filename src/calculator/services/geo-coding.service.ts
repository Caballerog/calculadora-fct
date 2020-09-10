import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { GEO_REQUEST } from "../constants/geo-coding.constants";

@Injectable({
  providedIn: "root"
})
export class GeoCodingService {
  constructor(private httpService: HttpService) {}

  public async getCoordinates(address: string): Promise<string> {
    const formatAddress = this._prepareUrl(address);

    const request = this._generateRequest(formatAddress);
    const response = await this.httpService.get(request);
    const coordinates =
      response.results[0].geometry.location.lat +
      "," +
      response.results[0].geometry.location.lng;

    return coordinates;
  }

  private _generateRequest(address: string) {
    return `${GEO_REQUEST.FULL_ENDPOINT}address=${address}&key=${
      GEO_REQUEST.APIKEY
    }`;
  }

  private _prepareUrl(input: string): string {
    return input
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ /g, "+");
  }
}
