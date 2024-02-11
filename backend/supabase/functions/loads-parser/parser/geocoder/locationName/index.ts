import { LoadSchema } from "../../openaiParser/extractLoadTool/index.ts";
import { LocationSchema } from "../../openaiParser/extractLoadTool/index.ts";

export const getFullLocationName = ({
  city,
  postcode,
  country,
}: LocationSchema) => {
  if (!city && !postcode) return "";

  const countryPostcode = [country, postcode].filter((x) => x).join("-");

  return [city, countryPostcode].filter((x) => x).join(", ") || "";
};

const getFullLocationNames = (locations: LocationSchema[]) =>
  locations.map((loc) => ({
    ...loc,
    fullName: getFullLocationName(loc),
  }));

export const addFullLocationNames = (loads: LoadSchema[]) =>
  loads.map((load) => ({
    ...load,
    pickup: getFullLocationNames(load.pickup),
    delivery: getFullLocationNames(load.delivery),
  }));

export type LoadsWithFullLocationNames = ReturnType<typeof filterForGeocoding>;
export const filterForGeocoding = (
  loads: ReturnType<typeof addFullLocationNames>,
) =>
  loads.filter(
    (load) =>
      load.pickup.every((loc) => loc.fullName) &&
      load.delivery.every((loc) => loc.fullName),
  );

export const extractLocationNames = (loads: LoadsWithFullLocationNames) =>
  loads.flatMap(
    (
      load,
    ) => [
      ...load.pickup.flatMap((loc) => loc.fullName),
      ...load.delivery.flatMap((loc) => loc.fullName),
    ],
  );
