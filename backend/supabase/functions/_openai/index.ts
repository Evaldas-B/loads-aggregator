import OpenAI from "https://deno.land/x/openai@v4.26.0/mod.ts";
import { env } from "../_utils/env.ts";

const apiKey = env.openAI.key;

export const openai = new OpenAI({ apiKey });
