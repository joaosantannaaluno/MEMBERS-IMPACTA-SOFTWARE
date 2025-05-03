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
  if (clients[`${databaseAuthToken}@${databaseUrl}`]) {
    return clients[`${databaseAuthToken}@${databaseUrl}`];
  }
  if (http) {
    clients[`${databaseAuthToken}@${databaseUrl}`] = createClientHttp({
      url: databaseUrl,
      authToken: databaseAuthToken,
    });
  } else {
    clients[`${databaseAuthToken}@${databaseUrl}`] = createClient({
      url: databaseUrl,
      authToken: databaseAuthToken,
    });
  }
  return clients[`${databaseAuthToken}@${databaseUrl}`];
};
