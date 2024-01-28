import OpenAI from "https://deno.land/x/openai@v4.26.0/mod.ts";
import { env } from "../_env/utils.ts";

const apiKey = env.openAI.key;

export const openai = new OpenAI({ apiKey });
