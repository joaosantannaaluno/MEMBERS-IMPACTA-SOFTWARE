import { z } from "zod";
import { procedure } from "../../../trpc";
import { dbClient } from "../../../../../../packages/main-db/src/db";
import { tipoMembro } from "../../../../../../packages/main-db/src/schema";

export default procedure.query(async (opts) => {
  //   const { id } = opts.input;
  const resultado = await dbClient.select().from(tipoMembro);
  return resultado;
});
