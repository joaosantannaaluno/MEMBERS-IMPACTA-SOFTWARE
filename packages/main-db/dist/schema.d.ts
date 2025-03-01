export declare const tipoMembro: import("drizzle-orm/sqlite-core", { with: { "resolution-mode": "import" } }).SQLiteTableWithColumns<{
    name: "tipo_membro";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/sqlite-core", { with: { "resolution-mode": "import" } }).SQLiteColumn<{
            name: "id";
            tableName: "tipo_membro";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        descricao: import("drizzle-orm/sqlite-core", { with: { "resolution-mode": "import" } }).SQLiteColumn<{
            name: "descricao";
            tableName: "tipo_membro";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        observacao: import("drizzle-orm/sqlite-core", { with: { "resolution-mode": "import" } }).SQLiteColumn<{
            name: "observacao";
            tableName: "tipo_membro";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        status: import("drizzle-orm/sqlite-core", { with: { "resolution-mode": "import" } }).SQLiteColumn<{
            name: "status";
            tableName: "tipo_membro";
            dataType: "string";
            columnType: "SQLiteText";
            data: "active" | "inactive";
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["active", "inactive"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        created_at: import("drizzle-orm/sqlite-core", { with: { "resolution-mode": "import" } }).SQLiteColumn<{
            name: "created_at";
            tableName: "tipo_membro";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        created_by: import("drizzle-orm/sqlite-core", { with: { "resolution-mode": "import" } }).SQLiteColumn<{
            name: "created_by";
            tableName: "tipo_membro";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        updated_at: import("drizzle-orm/sqlite-core", { with: { "resolution-mode": "import" } }).SQLiteColumn<{
            name: "updated_at";
            tableName: "tipo_membro";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updated_by: import("drizzle-orm/sqlite-core", { with: { "resolution-mode": "import" } }).SQLiteColumn<{
            name: "updated_by";
            tableName: "tipo_membro";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
    };
    dialect: "sqlite";
}>;
//# sourceMappingURL=schema.d.ts.map