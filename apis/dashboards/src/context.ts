import { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";

const getLocalAuthSub = (header: string | undefined) => {
    if (!header) {
        return undefined;
    }
    return JSON.parse(
        Buffer.from(header.split(".")[1] || "", "base64").toString("utf-8"),
    )["sub"];
};

export async function createLocalContext(opts: CreateHTTPContextOptions) {
    const authHeader = opts.req.headers["authorization"];

    return {
        auth: {
            jwt: {
                claims: { sub: getLocalAuthSub(authHeader) },
            },
        },
    };
}

export type ContextType = Awaited<ReturnType<typeof createLocalContext>>;