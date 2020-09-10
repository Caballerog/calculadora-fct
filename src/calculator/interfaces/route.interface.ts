export interface BaseRoute {
  timesVisited: number;
  destination: string;
}
export interface IRoute extends BaseRoute {
  startPoint: string;
  destination: string;
  timesVisited: number;
  distance: number;
  cost: string;
  [key: string]: any;
}
export interface FormRoute extends BaseRoute {}

export interface RouteParams {
  action: string;
  formRoute: FormRoute;
}
