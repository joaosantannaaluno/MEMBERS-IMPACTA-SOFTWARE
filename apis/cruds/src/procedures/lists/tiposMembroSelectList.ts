import { z } from "zod";
import { asc } from "drizzle-orm";
import { procedure } from "../../trpc";
import { dbClient, tipoMembro } from "@manager-members/main-db/src";

export default procedure.query(async () => {
  //   const { id } = opts.input;
  const resultado = await dbClient
    .select({
      id: tipoMembro.id,
      descricao: tipoMembro.descricao,
    })
    .from(tipoMembro)
    .orderBy(asc(tipoMembro.descricao));

  return resultado;
});
