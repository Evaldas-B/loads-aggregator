import { env } from "../_utils/env.ts";

// FIXME - Types are not working because the module is imported using .js extension. Most likely deno-vscode issue

import mapbox from "npm:@mapbox/mapbox-sdk@0.15.3";

const mapboxClient = mapbox({ accessToken: env.mapbox.key });

// Geocoding service
import mapboxGeocoding from "npm:@mapbox/mapbox-sdk@0.15.3/services/geocoding-v6.js";

// @deno-types="npm:@types/mapbox__mapbox-sdk@0.14"
import { type GeocodeService } from "npm:@mapbox/mapbox-sdk@0.15.3/services/geocoding-v6";

export const geocodingService = mapboxGeocoding(mapboxClient) as GeocodeService;

// Directions service
import mapboxDirections from "npm:@mapbox/mapbox-sdk@0.15.3/services/directions.js";

// @deno-types="npm:@types/mapbox__mapbox-sdk@0.14"
import { type DirectionsService } from "npm:@mapbox/mapbox-sdk@0.15.3/services/directions";

export const directionsService = mapboxDirections(
  mapboxClient,
) as DirectionsService;
