import { ChatCompletionCreateParamsBase } from "https://deno.land/x/openai@v4.26.0/resources/chat/completions.ts";
import { openai } from "../../../_openai/index.ts";
import { Stream } from "https://deno.land/x/openai@v4.26.0/streaming.ts";
import {
  extractLoadTool,
  LoadSchema,
  loadSchema,
} from "./extractLoadTool/index.ts";
import {
  ContactsSchema,
  contactsSchema,
  extractContactsTool,
} from "./extractContactsTool/index.ts";

const config: ChatCompletionCreateParamsBase = {
  model: "gpt-3.5-turbo-0125",
  stream: false,
  tools: [extractLoadTool, extractContactsTool],
  seed: 1111,
  temperature: 0,

  messages: [{
    role: "system",
    content:
      `Your job is to thoroughly examine given text and to extract vehicle shipments information by following these rules:
      * use extractLoad tool with alignment with provided JSON schema
      * same shipment must be extracted only once
      * likely to have more than one shipment(most likely one shipment per line)
      * Generating country names from city names is forbidden
      * If there are emails or phone numbers in the text use extractContacts tool`,
  }],
};

export const extractDataUsingLLM = async (text: string) => {
  const completion = await openai.chat.completions.create({
    ...config,

    messages: [
      ...config.messages,
      { role: "user", content: text },
    ],
  });

  if (completion instanceof Stream) {
    throw new Error("WRONG_CONFIG_DISABLE_STREAMING");
  }

  const toolCalls = completion.choices[0].message.tool_calls;

  if (!toolCalls || !toolCalls?.length) {
    throw new Error("NO_PARSABLE_DATA_FOUND");
  }

  const fnCalls = toolCalls.map((toolCall) => ({
    ...toolCall,
    function: {
      ...toolCall.function,
      arguments: JSON.parse(toolCall.function.arguments),
    },
  }));

  // Validate data using schemas
  const validatedLoads = fnCalls
    .filter((fn) => fn.function.name === "extractLoad")
    .map((fn) => loadSchema.nullable().catch(null).parse(fn.function.arguments))
    .filter((fn): fn is LoadSchema => fn !== null);

  const validatedContacts = fnCalls
    .filter((fn) => fn.function.name === "extractContacts")
    .map((fn) =>
      contactsSchema.nullable().catch(null).parse(fn.function.arguments)
    )
    .filter((fn): fn is ContactsSchema => fn !== null);

  return {
    loads: validatedLoads,
    contacts: validatedContacts[0],
  };
};
