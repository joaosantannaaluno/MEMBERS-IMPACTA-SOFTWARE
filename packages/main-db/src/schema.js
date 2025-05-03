"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.arquivos = exports.membro = exports.tipoMembro = void 0;
// import { relations } from "drizzle-orm";
const sqlite_core_1 = require("drizzle-orm/sqlite-core");
const s = __importStar(require("drizzle-orm/sqlite-core"));
const nanoid_1 = require("nanoid");
exports.tipoMembro = s.sqliteTable("tipo_membro", {
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
});
exports.membro = s.sqliteTable("membro", {
    id: (0, sqlite_core_1.text)("id")
        .primaryKey()
        .$defaultFn(() => (0, nanoid_1.nanoid)()),
    nome: (0, sqlite_core_1.text)("nome").notNull(),
    id_tipo_membro: (0, sqlite_core_1.text)("id_tipo_membro").references(() => exports.tipoMembro.id),
    id_foto: (0, sqlite_core_1.text)("id_foto").references(() => exports.arquivos.id),
    status: (0, sqlite_core_1.text)("status", {
        enum: ["active", "inactive"],
    }).notNull(),
    observacao: (0, sqlite_core_1.text)("observacao"),
    created_at: (0, sqlite_core_1.integer)("created_at", {
        mode: "timestamp_ms",
    }).$defaultFn(() => new Date()),
    created_by: (0, sqlite_core_1.text)("created_by"),
    updated_at: (0, sqlite_core_1.integer)("updated_at", {
        mode: "timestamp_ms",
    }).$defaultFn(() => new Date()),
    updated_by: (0, sqlite_core_1.text)("updated_by"),
});
exports.arquivos = s.sqliteTable("arquivos", {
    id: (0, sqlite_core_1.text)("id")
        .primaryKey()
        .$defaultFn(() => (0, nanoid_1.nanoid)()),
    size: (0, sqlite_core_1.integer)("size").notNull(),
    bucket: (0, sqlite_core_1.text)("bucket").notNull(),
    mime_type: (0, sqlite_core_1.text)("mime_type").notNull(),
    file_name: (0, sqlite_core_1.text)("key").notNull(),
    status: (0, sqlite_core_1.text)("status", {
        enum: ["pendente", "completo"],
    }).default("pendente"),
    created_at: (0, sqlite_core_1.integer)("created_at", {
        mode: "timestamp_ms",
    }).$defaultFn(() => new Date()),
    created_by: (0, sqlite_core_1.text)("created_by"),
    updated_at: (0, sqlite_core_1.integer)("updated_at", {
        mode: "timestamp_ms",
    }).$defaultFn(() => new Date()),
    updated_by: (0, sqlite_core_1.text)("updated_by"),
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
//# sourceMappingURL=schema.js.map