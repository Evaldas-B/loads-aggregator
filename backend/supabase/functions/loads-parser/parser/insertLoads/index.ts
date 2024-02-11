import { createClient } from "npm:@supabase/supabase-js@2.39.3";
import { Database } from "../../../databaseTypes.ts";
import { ParsedLoad } from "../index.ts";
import { LocationSchema } from "../openaiParser/extractLoadTool/index.ts";

type SupabaseClient = ReturnType<typeof createClient<Database>>;
let supabaseClient: SupabaseClient | null = null;

export const initializeSupabase = (authHeader: string) => {
  supabaseClient = createClient<Database>(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    { global: { headers: { Authorization: authHeader } } },
  );
};

type LocationWithCoordinates = LocationSchema & {
  coordinates: { lng: number; lat: number };
};
const formatLocations = (
  location: LocationWithCoordinates[],
  type: "pickup" | "delivery",
) =>
  location.map((loc) => {
    return {
      ...loc,
      type,
      coordinates: `POINT(${loc.coordinates.lng} ${loc.coordinates.lat})`,
    };
  });

const formatForInsertion = (parsedLoads: ParsedLoad[]) =>
  parsedLoads.map((load) => {
    const { pickup, delivery, ...loadData } = load;

    const locations = [
      ...formatLocations(pickup, "pickup"),
      ...formatLocations(delivery, "delivery"),
    ];

    return {
      load: loadData,
      locations,
    };
  });

export const insertLoads = async (parsedLoads: ParsedLoad[]) => {
  if (!supabaseClient) throw new Error("SUPABASE_CLIENT_NOT_INITIALIZED");

  const formattedForInsertion = formatForInsertion(parsedLoads);

  for (const { load, locations } of formattedForInsertion) {
    const { data: insertedLoad, error: insertLoadError } = await supabaseClient
      .from(
        "agg_loads",
      ).insert(load).select("id").single();

    // Move to next load if insertion failed
    if (insertLoadError && !insertedLoad) continue;

    await supabaseClient.from(
      "agg_locations",
    )
      // FIXME - Add some schema validation
      //@ts-ignore
      .insert(locations.map((loc) => ({ ...loc, load_id: insertedLoad.id })));
  }
};
