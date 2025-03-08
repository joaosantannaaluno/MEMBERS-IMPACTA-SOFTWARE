import { tipoMembro } from "./../../../../../../packages/main-db/src/schema";
import { dbClient } from "./../../../../../../packages/main-db/src/db";
import { z } from "zod";
import { procedure } from "../../../trpc";

export default procedure
  .input(
    z.object({
      status: z.enum(["active", "inactive"]),
      descricao: z.string(),
      observacao: z.string().nullable(),
    })
  )
  .mutation(async (opts) => {
    const { descricao, observacao, status } = opts.input;

    const [resultado] = await dbClient
      .insert(tipoMembro)
      .values({
        descricao: descricao,
        status: status,
        observacao: observacao,
        created_at: new Date(),
        created_by: "admin",
      })
      .returning({
        id: tipoMembro.id,
      });
    return resultado;
  });
