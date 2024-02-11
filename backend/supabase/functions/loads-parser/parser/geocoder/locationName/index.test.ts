import { assertEquals } from "https://deno.land/std@0.213.0/assert/assert_equals.ts";
import { getFullLocationName } from "./index.ts";

Deno.test("All field missing", () => {
  const fullName = getFullLocationName({});

  assertEquals(fullName, "");
});

Deno.test("All fields present", () => {
  const fullName = getFullLocationName(
    {
      city: "Aachen",
      country: "DE",
      postcode: "52062",
    },
  );

  assertEquals(fullName, "Aachen, DE-52062");
});

Deno.test("Only city present", () => {
  const fullName = getFullLocationName(
    {
      city: "Aachen",
    },
  );

  assertEquals(fullName, "Aachen");
});

Deno.test("Only postcode present", () => {
  const fullName = getFullLocationName(
    {
      postcode: "52062",
    },
  );

  assertEquals(fullName, "52062");
});

Deno.test("Only country present", () => {
  const fullName = getFullLocationName(
    {
      country: "DE",
    },
  );

  assertEquals(fullName, "");
});

Deno.test("Only city, postcode present", () => {
  const fullName = getFullLocationName(
    {
      city: "Aachen",
      postcode: "52062",
    },
  );

  assertEquals(fullName, "Aachen, 52062");
});

Deno.test("Only city, country present", () => {
  const fullName = getFullLocationName(
    {
      city: "Aachen",
      country: "DE",
    },
  );

  assertEquals(fullName, "Aachen, DE");
});

Deno.test("Only country, postcode present", () => {
  const fullName = getFullLocationName(
    {
      country: "DE",
      postcode: "52062",
    },
  );

  assertEquals(fullName, "DE-52062");
});
