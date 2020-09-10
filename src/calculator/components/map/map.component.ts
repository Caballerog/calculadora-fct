import * as Leaflet from 'leaflet';

import {
  CIRCLE_STYLE,
  INITIAL_ZOOM,
  MAP_TILE_LAYERS,
  ROUTE_LINE_STYLE
} from 'src/calculator/constants/map.constant';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import {
  ORIGIN,
  ORIGIN_POSITION
} from 'src/calculator/constants/route.constants';

import { MapService } from 'src/calculator/services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {
  private map: any;
  private mainLayer: any;
  @Input() private report;

  constructor(private mapService: MapService) {}

  ngOnInit() {
    this.configureMap(ORIGIN_POSITION);
    this.mainLayer = new Leaflet.layerGroup();
    this.map.addLayer(this.mainLayer);
    this.addOrigin(ORIGIN_POSITION, ORIGIN);
  }

  ngOnChanges() {
    this.updateMap();
  }
  private updateMap() {
    if (!this.report) {
      return;
    }
    const destination = this.report.destinations[
      this.report.destinations.length - 1
    ];
    this.clearMarkers();
    this.addOrigin(ORIGIN_POSITION, ORIGIN);
    this.setMarker(destination.endPoint.split(','), destination.destination);
    this.drawRoute(destination.route);
    this.centerMapFromPoints(destination.route);
  }

  //TODO create interfaces.
  private configureMap(viewCenter: { latitude; longitude }) {
    const { latitude, longitude } = viewCenter;
    this.map = Leaflet.map('routeMap').setView(
      [latitude, longitude],
      INITIAL_ZOOM
    );

    Leaflet.tileLayer(MAP_TILE_LAYERS.URL, MAP_TILE_LAYERS.PARAMS).addTo(
      this.map
    );
  }

  private addOrigin(
    position: { latitude; longitude },
    textContent: string = ''
  ) {
    const { latitude, longitude } = position;
    return Leaflet.circle([latitude, longitude], CIRCLE_STYLE)
      .addTo(this.mainLayer)
      .bindPopup(textContent)
      .openPopup();
  }

  private setMarker(position: any, textContent: string = '') {
    return Leaflet.marker(position)
      .addTo(this.mainLayer)
      .bindPopup(textContent)
      .openPopup();
  }

  private drawRoute(route: any[]) {
    var leafletRoute = new Leaflet.Polyline(route, ROUTE_LINE_STYLE);
    leafletRoute.addTo(this.mainLayer);
  }

  private centerMapFromPoints(points: any[]) {
    this.map.fitBounds([points]);
  }

  private clearMarkers() {
    this.mainLayer.clearLayers();
  }
}
