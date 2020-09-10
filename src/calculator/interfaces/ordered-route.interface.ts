import { IRoute } from "./route.interface";

export interface IOrderedRoute {
  near: {
    routes: Array<IRoute>; //Make interface for this
    range: string;
    hoursGiven?: number;
  };
  medium: {
    routes: Array<IRoute>;
    range: string;
    hoursGiven?: number;
  };
  far: {
    routes: Array<IRoute>;
    range: string;
    hoursGiven?: number;
  };
}
