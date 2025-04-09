import { z } from "zod";
import { procedure } from "../../../trpc";
import { dbClient } from "../../../../../../packages/main-db/src/db";
import {
  membro,
  tipoMembro,
} from "../../../../../../packages/main-db/src/schema";
import { asc, eq } from "drizzle-orm";

export default procedure.query(async (opts) => {
  const resultado = await dbClient
    .select({
      id: membro.id,
      status: membro.status,
      nome: membro.nome,
      observacao: membro.observacao,
      created_at: membro.created_at,
      created_by: membro.created_by,
      tipo_membro: tipoMembro.descricao,
    })
    .from(membro)
    .innerJoin(tipoMembro, eq(tipoMembro.id, membro.id_tipo_membro))
    .orderBy(asc(membro.nome));

  return {
    data: resultado,
    count: 0,
  };
});
