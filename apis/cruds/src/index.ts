import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter, AppRouterType } from './router';
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { TRPCClientError } from "@trpc/client";
import { createLocalContext } from './context';
import cors from "cors";

export * from "./router"
export * from "./trpc"

export type CrudsAPIInputs = inferRouterInputs<AppRouterType>;
export type CrudsAPIOutputs = inferRouterOutputs<AppRouterType>;
export type CrudsTRPCErrors = TRPCClientError<AppRouterType>;

const server = createHTTPServer({
    router: appRouter,
    createContext: createLocalContext,
    middleware: cors()
});


const port = 3000;
async function startServer() {
    server.listen(port);
    console.log(`Servidor rodando em http://localhost:${port}`);
}

startServer();