import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

export const tipoMembro = sqliteTable(
  "tipo_membro",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),
    descricao: text("descricao").notNull(),
    observacao: text("observacao"),
    status: text("status", {
      enum: ["active", "inactive"],
    }).notNull(),
    created_at: integer("created_at", {
      mode: "timestamp_ms",
    }).$defaultFn(() => new Date()),
    created_by: text("created_by"),
    updated_at: integer("updated_at", {
      mode: "timestamp_ms",
    }).$defaultFn(() => new Date()),
    updated_by: text("updated_by"),
  },
  () => ({})
);
