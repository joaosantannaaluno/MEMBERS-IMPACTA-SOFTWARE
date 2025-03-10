import { initTRPC } from "@trpc/server"
import { ContextType } from "./context";

const t = initTRPC.create();

export const router = t.router;
export const procedure = t.procedure