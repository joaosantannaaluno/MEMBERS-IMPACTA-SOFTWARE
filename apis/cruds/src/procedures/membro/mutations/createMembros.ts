import { membro } from "../../../../../../packages/main-db/src/schema";
import { dbClient } from "../../../../../../packages/main-db/src/db";
import { z } from "zod";
import { procedure } from "../../../trpc";

export default procedure
  .input(
    z.object({
      idTipoMembro: z.string().nanoid(),
      nome: z.string().max(255),
      status: z.enum(["active", "inactive"]),
      observacao: z.string().nullable(),
    })
  )
  .mutation(async (opts) => {
    const { idTipoMembro, nome, observacao, status } = opts.input;

    const [resultado] = await dbClient
      .insert(membro)
      .values({
        nome: nome,
        id_tipo_membro: idTipoMembro,
        status: status,
        observacao: observacao,
        created_at: new Date(),
        created_by: "admin",
      })
      .returning({
        id: membro.id,
      });
    return resultado;
  });
