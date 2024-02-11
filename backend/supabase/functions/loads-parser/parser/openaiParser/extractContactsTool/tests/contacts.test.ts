import { assertEquals } from "https://deno.land/std@0.213.0/assert/assert_equals.ts";
import { extractDataUsingLLM } from "../../index.ts";

Deno.test({
  name: "John Doe Inc, +49 69 1234 5678, john.doe@domain.com",
  ignore: !Deno.args.includes("--include-llm-tests"),
}, async () => {
  const fnCalls = await extractDataUsingLLM(
    "John Doe GmbH, +49 69 1234 5678, john.doe@domain.com",
  );

  assertEquals(fnCalls.loads.length, 0);

  assertEquals(fnCalls.contacts, {
    company: "John Doe GmbH",
    emails: ["john.doe@domain.com"],
    phones: ["+49 69 1234 5678"],
  });
});
