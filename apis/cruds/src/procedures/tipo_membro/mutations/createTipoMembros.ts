import { z } from "zod";
import { procedure } from "../../../trpc";
import { dbClient, tipoMembro } from "@manager-members/main-db";

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
