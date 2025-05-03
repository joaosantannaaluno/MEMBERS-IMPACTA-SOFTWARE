import { z } from "zod";
import { eq } from "drizzle-orm";
import { procedure } from "../../trpc.js";
import { arquivos, dbClient } from "@manager-members/main-db";

export default procedure
  .input(
    z.object({
      id: z.string().nanoid(),
    })
  )
  .mutation(async (opts) => {
    const { id } = opts.input;

    const [resultado] = await dbClient
      .update(arquivos)
      .set({ status: "completo" })
      .where(eq(arquivos.id, id))
      .returning({
        id: arquivos.id,
      })
      .execute();

    return resultado;
  });
