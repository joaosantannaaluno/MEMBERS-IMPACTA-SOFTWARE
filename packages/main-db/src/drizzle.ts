import { drizzle } from "drizzle-orm/libsql";
import { createLibSQLClient } from "./client";
import * as schema from "./schema.js";

export const createDrizzleClient = ({
  databaseUrl,
  databaseAuthToken,
  http = false,
}: {
  databaseUrl: string;
  databaseAuthToken: string | undefined;
  http?: boolean | undefined;
}) => {
  const client = <NonNullable<ReturnType<typeof createLibSQLClient>>>(
    createLibSQLClient({
      databaseUrl,
      databaseAuthToken,
      http,
    })
  );
  return drizzle(client, {
    schema,
  });
};
