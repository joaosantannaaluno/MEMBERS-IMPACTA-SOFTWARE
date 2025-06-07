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


const port = process.env.PORT;
async function startServer() {
    if (!port) {
        console.log("porta não encontrada");
        return;
    }

    server.listen(parseInt(port, 10));
    console.log(`Servidor rodando em http://localhost:${port}`);
}


startServer();