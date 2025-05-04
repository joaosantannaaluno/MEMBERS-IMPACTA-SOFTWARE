import { createClient } from "@libsql/client";
import { createClient as createClientHttp } from "@libsql/client/web";

const clients: {
  [key: string]: ReturnType<typeof createClient | typeof createClientHttp>;
} = {};

export const createLibSQLClient = ({
  databaseUrl,
  databaseAuthToken,
  http = false,
}: {
  databaseUrl: string;
  databaseAuthToken: string | undefined;
  http?: boolean | undefined;
}) => {
  const key = `${databaseAuthToken}@${databaseUrl}`;
  if (clients[key]) {
    return clients[key];
  }

  const config = {
    url: databaseUrl,
    ...(databaseAuthToken ? { authToken: databaseAuthToken } : {}),
  };

  clients[key] = http ? createClientHttp(config) : createClient(config);

  return clients[key];
};
