import { z } from "zod";
import { procedure } from "../../../trpc";
import { dbClient, membro } from "@manager-members/main-db/src";
import { eq } from "drizzle-orm";

export default procedure
  .input(
    z.object({
      id: z.string().nanoid(),
      idTipoMembro: z.string().nanoid(),
      nome: z.string().max(255),
      status: z.enum(["active", "inactive"]),
      observacao: z.string().nullable(),
    })
  )
  .mutation(async (opts) => {
    const { id, nome, idTipoMembro, observacao, status } = opts.input;

    const [resultado] = await dbClient
      .update(membro)
      .set({
        nome: nome,
        id_tipo_membro: idTipoMembro,
        status: status,
        observacao: observacao,
        updated_at: new Date(),
        updated_by: "admin",
      })
      .where(eq(membro.id, id))
      .returning({
        id: membro.id,
      });

    return resultado;
  });
