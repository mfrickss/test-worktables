import NodeCache from "node-cache";
import { env } from "./env";

export const cache = new NodeCache({ stdTTL: env.cacheTtlSeconds });
