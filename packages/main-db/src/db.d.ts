import "dotenv/config";
import * as schema from "./schema.js";
export declare const dbClient: import("drizzle-orm/libsql/driver-core.js").LibSQLDatabase<typeof schema> & {
    $client: import("@libsql/client/.").Client;
};
