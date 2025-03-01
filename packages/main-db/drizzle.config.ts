import { defineConfig, type Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  dialect: "turso",
  schema: "./src/schema.ts",
  dbCredentials: {
    url: `${process.env.TURSO_DATABASE_URL}?authToken=${<string>(
      process.env.TURSO_AUTH_TOKEN
    )}`,
  },
});
