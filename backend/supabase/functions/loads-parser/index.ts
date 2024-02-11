import { type RequestSchema, requestSchema } from "./requestSchema.ts";
import { parseLoads } from "./parser/index.ts";
import { initializeSupabase, insertLoads } from "./parser/insertLoads/index.ts";

const response = (body: Record<string, any>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

Deno.serve(async (_req) => {
  let req: RequestSchema;

  // Parse request body
  try {
    req = requestSchema.parse(await _req.json());
  } catch (error) {
    return response({ error: "WRONG_REQUEST_BODY", cause: error }, 400);
  }

  const { from, subject, body, bodyHtml } = req;

  if (!body) return response({ error: "EMAIL_BODY_MISSING" }, 400);

  // TODO If email is not received from the whitelisted sender return
  // const whitelist: string[] = [];

  // if (!whitelist.includes(from)) {
  //   return response({ error: "SENDER_NOT_WHITELISTED" }, 400);
  // }

  // NOTE 2 limiting factors: time to parse using LLM, response token limit with is only 4096 tokens
  // Can be significantly increased when cashing is implemented
  // If email is too long for parsing return
  const maxEmailBodyLength = 20000;
  if (body.length >= maxEmailBodyLength) {
    return response(
      {
        error: "EMAIL_BODY_TOO_LONG",
        message:
          `Exceeded email body length of ${maxEmailBodyLength} characters, provided body length was ${body.length}`,
      },
      400,
    );
  }

  const parsedLoads = await parseLoads({ text: body });

  const authHeader = _req.headers.get("Authorization")!;
  initializeSupabase(authHeader);
  await insertLoads(parsedLoads);

  return response({ message: "Loads extracted 🎉" });
});
