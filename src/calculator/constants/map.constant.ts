export const MAP_TILE_LAYERS = {
  URL:
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  PARAMS: {
    attribution: "Source: Esri"
  }
};
export const INITIAL_ZOOM = 14;

export const ROUTE_LINE_STYLE = {
  color: "cyan",
  weight: 6,
  opacity: 0.5,
  smoothFactor: 2
};
export const CIRCLE_STYLE = {
  color: "blue",
  fillColor: "cyan",
  fillOpacity: 0.5,
  radius: 20
};
