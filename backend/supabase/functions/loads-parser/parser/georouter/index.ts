import { directionsService } from "../../../_mapbox/index.ts";
import { GeocodedLoad } from "../geocoder/index.ts";
import { type Waypoint } from "npm:@mapbox/mapbox-sdk@0.15.3/services/directions";

const convertGeometryToText = (
  { coordinates }: GeoJSON.MultiLineString | GeoJSON.LineString,
) => {
  const textCoordinates = coordinates.map(([lng, lat]) => `${lng} ${lat}`);

  return `LineString(${textCoordinates.join(", ")})`;
};

const getDirections = async (waypoints: Waypoint[]) => {
  const path = await directionsService.getDirections({
    waypoints,
    profile: "driving",
    steps: false,
    alternatives: false,
    overview: "simplified",
    geometries: "geojson",
  }).send();

  const [route] = path.body.routes;
  const { distance, geometry } = route;

  return { distance, route: convertGeometryToText(geometry) };
};

const getLoadWaypoints = (load: GeocodedLoad): Waypoint[] => {
  const loadCoordinates = [
    ...load.pickup.flatMap((loc) => loc.coordinates),
    ...load.delivery.flatMap((loc) => loc.coordinates),
  ];

  return loadCoordinates.map((coord) => ({
    coordinates: [coord.lng, coord.lat],
  }));
};

export const georouteLoads = async (loads: GeocodedLoad[]) => {
  const loadsWithRoutes = await Promise.all(loads.map(async (load) => ({
    ...load,
    ...await getDirections(getLoadWaypoints(load)),
  })));

  return loadsWithRoutes;
};
