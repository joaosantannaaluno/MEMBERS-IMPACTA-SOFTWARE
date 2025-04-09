// import { relations } from "drizzle-orm";
import { integer, text } from "drizzle-orm/sqlite-core";
import * as s from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

export const tipoMembro = s.sqliteTable("tipo_membro", {
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
});

export const membro = s.sqliteTable("membro", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  nome: text("nome").notNull(),
  id_tipo_membro: text("id_tipo_membro").references(() => tipoMembro.id),
  id_foto: text("id_foto").references(() => arquivos.id),
  status: text("status", {
    enum: ["active", "inactive"],
  }).notNull(),
  observacao: text("observacao"),
  created_at: integer("created_at", {
    mode: "timestamp_ms",
  }).$defaultFn(() => new Date()),
  created_by: text("created_by"),
  updated_at: integer("updated_at", {
    mode: "timestamp_ms",
  }).$defaultFn(() => new Date()),
  updated_by: text("updated_by"),
});

export const arquivos = s.sqliteTable("arquivos", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  size: integer("size").notNull(),
  bucket: text("bucket").notNull(),
  mime_type: text("mime_type").notNull(),
  file_name: text("key").notNull(),
  status: text("status", {
    enum: ["pendente", "completo"],
  }).default("pendente"),
  created_at: integer("created_at", {
    mode: "timestamp_ms",
  }).$defaultFn(() => new Date()),
  created_by: text("created_by"),
  updated_at: integer("updated_at", {
    mode: "timestamp_ms",
  }).$defaultFn(() => new Date()),
  updated_by: text("updated_by"),
});

// export const arquivosRelations = relations(arquivos, ({ one }) => ({
//   creator: one(users, {
//     fields: [arquivos.created_by],
//     references: [users.id],
//     relationName: "creator",
//   }),
//   updater: one(users, {
//     fields: [arquivos.updated_by],
//     references: [users.id],
//     relationName: "updater",
//   }),
// }));
