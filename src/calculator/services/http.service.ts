import { Injectable } from "@angular/core";
import { IHttpBody } from "../interfaces/http-body.interface";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor() {}

  get = (endpoint: string) => fetch(endpoint).then(response => response.json());

  getPlain = (endpoint: string) =>
    fetch(endpoint).then(response => response.text());

  post = (endpoint: string, options: IHttpBody) =>
    fetch(endpoint, {
      method: "post",
      body: JSON.stringify(options),
      headers: { "Content-Type": "application/json" }
    }).then(response => response.json());

  put = (endpoint: string, options: IHttpBody) =>
    fetch(endpoint, {
      method: "put",
      body: JSON.stringify(options),
      headers: { "Content-Type": "application/json" }
    }).then(response => response.json());

  delete = (endpoint: string) =>
    fetch(endpoint, {
      method: "delete"
    }).then(response => response.json());
}
