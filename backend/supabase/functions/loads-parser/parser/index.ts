import { extractDataUsingLLM } from "./openaiParser/index.ts";
import { geocodeLoads } from "./geocoder/index.ts";
import { georouteLoads } from "./georouter/index.ts";

type Params = {
  text: string;
  loadsExtractor?: typeof extractDataUsingLLM;
};

export type ParsedLoad = Awaited<ReturnType<typeof parseLoads>>[number];
export const parseLoads = async (
  { text, loadsExtractor = extractDataUsingLLM }: Params,
) => {
  // TODO Extract loads information and contacts information
  const { loads, contacts } = await loadsExtractor(text);

  // Add coordinates to loads
  const loadsWithCoordinates = await geocodeLoads(loads);

  // Add routes to loads
  const loadsWithRoutes = await georouteLoads(loadsWithCoordinates);

  return loadsWithRoutes.map((load) => ({ ...load, ...contacts }));
};
