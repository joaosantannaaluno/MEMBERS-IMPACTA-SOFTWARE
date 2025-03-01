"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipoMembro = void 0;
const sqlite_core_1 = require("drizzle-orm/sqlite-core");
const nanoid_1 = require("nanoid");
exports.tipoMembro = (0, sqlite_core_1.sqliteTable)("tipo_membro", {
    id: (0, sqlite_core_1.text)("id")
        .primaryKey()
        .$defaultFn(() => (0, nanoid_1.nanoid)()),
    descricao: (0, sqlite_core_1.text)("descricao").notNull(),
    observacao: (0, sqlite_core_1.text)("observacao"),
    status: (0, sqlite_core_1.text)("status", {
        enum: ["active", "inactive"],
    }).notNull(),
    created_at: (0, sqlite_core_1.integer)("created_at", {
        mode: "timestamp_ms",
    }).$defaultFn(() => new Date()),
    created_by: (0, sqlite_core_1.text)("created_by"),
    updated_at: (0, sqlite_core_1.integer)("updated_at", {
        mode: "timestamp_ms",
    }).$defaultFn(() => new Date()),
    updated_by: (0, sqlite_core_1.text)("updated_by"),
}, () => ({}));
//# sourceMappingURL=schema.js.map