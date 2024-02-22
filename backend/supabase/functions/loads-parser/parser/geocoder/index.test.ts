import { getLoadMock } from "../openaiParser/extractLoadTool/tests/mocks.ts";

import { assertEquals } from "https://deno.land/std@0.213.0/assert/assert_equals.ts";
import { geocodeLoads } from "./index.ts";

Deno.test("Aachen -> Hannover", async () => {
  const { loadMock: loadMock, coordinatesMock: coordinatesMock } = getLoadMock(
    "Aachen -> Hannover",
  );

  const geocodedLoads = await geocodeLoads([loadMock]);

  assertEquals(geocodedLoads.length, 1);
  const [load1] = geocodedLoads;

  const pickupCoordinates = load1.pickup.map((loc) => loc.coordinates);
  assertEquals(pickupCoordinates, coordinatesMock.pickup);

  const deliveryCoordinates = load1.delivery.map((loc) => loc.coordinates);
  assertEquals(deliveryCoordinates, coordinatesMock.delivery);
});

Deno.test("Aachen -> FR", async () => {
  const { loadMock } = getLoadMock("Aachen -> FR");

  const geocodedLoads = await geocodeLoads([loadMock]);

  // Country is too broad geographical term, hence should not be geocoded
  assertEquals(geocodedLoads.length, 0);
});

Deno.test("Aachen, DE-52070 -> Hannover, DE-30177", async () => {
  const { loadMock, coordinatesMock } = getLoadMock(
    "Aachen, DE-52070 -> Hannover, DE-30177",
  );

  const geocodedLoads = await geocodeLoads([loadMock]);

  assertEquals(geocodedLoads.length, 1);
  const [load1] = geocodedLoads;

  const pickupCoordinates = load1.pickup.map((loc) => loc.coordinates);
  assertEquals(pickupCoordinates, coordinatesMock.pickup);

  const deliveryCoordinates = load1.delivery.map((loc) => loc.coordinates);
  assertEquals(deliveryCoordinates, coordinatesMock.delivery);
});
