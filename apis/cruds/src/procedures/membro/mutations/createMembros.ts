import { z } from "zod";
import { procedure } from "../../../trpc";
import { dbClient, membro } from "@manager-members/main-db";

export default procedure
  .input(
    z.object({
      idTipoMembro: z.string().nanoid(),
      idFoto: z.string().nanoid().nullable(),
      nome: z.string().max(255),
      status: z.enum(["active", "inactive"]),
      observacao: z.string().nullable(),
    })
  )
  .mutation(async (opts) => {
    const { idTipoMembro, nome, observacao, status, idFoto } = opts.input;

    const [resultado] = await dbClient
      .insert(membro)
      .values({
        nome: nome,
        id_tipo_membro: idTipoMembro,
        status: status,
        id_foto: idFoto,
        observacao: observacao,
        created_at: new Date(),
        created_by: "admin",
      })
      .returning({
        id: membro.id,
      });
    return resultado;
  });
