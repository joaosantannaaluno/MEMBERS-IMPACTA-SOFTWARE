import { z } from "zod";
import { procedure } from "../../../trpc";
import { eq } from "drizzle-orm";
import { dbClient, tipoMembro } from "@manager-members/main-db/src";

export default procedure
  .input(
    z.object({
      id: z.string().nanoid(),
    })
  )
  .query(async (opts) => {
    const { id } = opts.input;

    const [resultado] = await dbClient
      .select()
      .from(tipoMembro)
      .where(eq(tipoMembro.id, id))
      .execute();

    return resultado;
  });
