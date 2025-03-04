import { z } from "zod";
import { procedure } from "../../../trpc";
import { dbClient, tipoMembro } from "../../../../../../packages/main-db";
import { eq } from "drizzle-orm";

export default procedure
  .input(
    z.object({
      id: z.string().nanoid(),
      status: z.enum(["active", "inactive"]),
      descricao: z.string(),
      observacao: z.string(),
    })
  )
  .mutation(async (opts) => {
    const { id, descricao, observacao, status } = opts.input;


    const [resultado] = await dbClient
      .update(tipoMembro)
      .set({
        descricao: descricao,
        status: status,
        observacao: observacao,
        updated_at: new Date(),
        updated_by: "admin",
      })
      .where(eq(tipoMembro.id, id))
      .returning({
        id: tipoMembro.id,
      });
      
    return resultado;
  });
