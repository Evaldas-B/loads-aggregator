import { ChatCompletionCreateParamsBase } from "https://deno.land/x/openai@v4.26.0/resources/chat/completions.ts";
import { openai } from "../../_openai/index.ts";
import { Stream } from "https://deno.land/x/openai@v4.26.0/streaming.ts";
import { parseLoadTool } from "./loadTool.ts";

const config: ChatCompletionCreateParamsBase = {
  model: "gpt-3.5-turbo-1106",
  stream: false,
  tools: [parseLoadTool],
  seed: 1111,
  temperature: 0.5,

  messages: [{
    role: "system",
    content:
      "Utilize the parseLoad function to thoroughly examine the specified data in alignment with the given dataset. Ensure that each load listing is parsed only once. It is crucial to refrain from generating or inferring additional data",
  }],
};

export const parseEmailWithLLM = async (emailContent: string) => {
  const completion = await openai.chat.completions.create({
    ...config,

    messages: [
      ...config.messages,
      { role: "user", content: emailContent },
    ],
  });

  if (completion instanceof Stream) {
    throw new Error("WRONG_CONFIG_DISABLE_STREAMING");
  }

  const toolCalls = completion.choices[0].message.tool_calls;

  if (!toolCalls || !toolCalls?.length) {
    throw new Error("NO_PARSABLE_DATA_FOUND");
  }

  return toolCalls.map((toolCall) => ({
    ...toolCall,
    function: {
      ...toolCall.function,
      arguments: JSON.parse(toolCall.function.arguments),
    },
  }));
};
