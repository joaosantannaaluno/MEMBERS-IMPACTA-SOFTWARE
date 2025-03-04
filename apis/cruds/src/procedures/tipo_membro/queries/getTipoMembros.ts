import { z } from "zod";
import { procedure } from "../../../trpc";
import { dbClient } from "../../../../../../packages/main-db";
import { tipoMembro } from "../../../../../../packages/main-db";
import { eq, and } from "drizzle-orm";

export default procedure
  .input(
    z.object({
      id: z.string().nanoid(),
    })
  )
  .query(async (opts) => {
    const { id } = opts.input;

    const resultado = await dbClient
      .select()
      .from(tipoMembro)
      .where(eq(tipoMembro.id, id))
      .execute();
    return resultado;
  });
