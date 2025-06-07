import { procedure } from "../../../trpc";
import { asc, eq, count } from "drizzle-orm";
import { dbClient, membro, tipoMembro } from "@manager-members/main-db";

export default procedure.query(async (opts) => {
  const resultado = await dbClient
    .select({
      qtd: count(membro.id_tipo_membro),
      tipo: tipoMembro.descricao,
    })
    .from(tipoMembro)
    .leftJoin(membro, eq(tipoMembro.id, membro.id_tipo_membro))
    .groupBy(tipoMembro.id)
    .orderBy(asc(tipoMembro.descricao));

  return {
    data: resultado || [],
  };
});
