import { geocodingService } from "../../../_mapbox/index.ts";
import { LoadSchema } from "../openaiParser/extractLoadTool/index.ts";
import {
  addFullLocationNames,
  extractLocationNames,
  filterForGeocoding,
  type LoadsWithFullLocationNames,
} from "./locationName/index.ts";

// @deno-types="npm:@types/lodash-es@4.17.12";
import { keyBy, mapValues, uniq } from "npm:lodash-es@4.17.21";

type GeocodedLocations = Awaited<ReturnType<typeof geocodeLocations>>;
const geocodeLocations = async (locationNames: string[]) => {
  const uniqueLocationNames = uniq(locationNames);

  // Geocode unique locations
  const geocodingRequests = uniqueLocationNames.map((loc) =>
    geocodingService.forwardGeocode({
      mode: "standard",
      query: loc,
      limit: 1,
      autocomplete: true,
    })
  );

  const geocodingResponses = await Promise.all(
    geocodingRequests.map((req) => req.send()),
  );

  // Map location names over coordinates
  const coordinatesQuery = geocodingResponses.map((res) => {
    const [feature] = res.body.features;
    const { context } = feature.properties;

    const country = context.country?.country_code;
    const city = context.place?.name;
    const postcode = context.postcode?.name;
    const [lng, lat] = feature.geometry.coordinates;

    const query = res.request.query.q;

    return {
      city,
      country,
      postcode,
      coordinates: { lng, lat },
      query,
    };
  });

  // Create a map of location names and coordinates
  const coordinatesMap = keyBy(coordinatesQuery, "query");

  // Remove query key from values object
  return mapValues(coordinatesMap, ({ query, ...location }) => location);
};

const attachCoordinates = (
  loads: LoadsWithFullLocationNames,
  geocodedLocations: GeocodedLocations,
) =>
  loads.map((load) => ({
    ...load,
    pickup: load.pickup.map(({ fullName }) => geocodedLocations[fullName]),
    delivery: load.delivery.map(({ fullName }) => geocodedLocations[fullName]),
  }));

export type GeocodedLoad = Awaited<ReturnType<typeof geocodeLoads>>[number];
export const geocodeLoads = async (loads: LoadSchema[]) => {
  const loadsWithFullLocationNames = addFullLocationNames(loads);

  const filteredForGeocoding = filterForGeocoding(loadsWithFullLocationNames);

  const locationNames = extractLocationNames(filteredForGeocoding);

  const coordinatesMap = await geocodeLocations(locationNames);

  return attachCoordinates(filteredForGeocoding, coordinatesMap);
};
