import { z } from "zod";
import { procedure } from "../../../trpc";
import { asc } from "drizzle-orm";
import { dbClient, tipoMembro } from "@manager-members/main-db";

export default procedure.query(async (opts) => {
  //   const { id } = opts.input;
  const resultado = await dbClient
    .select()
    .from(tipoMembro)
    .orderBy(asc(tipoMembro.descricao));

  return {
    data: resultado,
    count: 0,
  };
});
