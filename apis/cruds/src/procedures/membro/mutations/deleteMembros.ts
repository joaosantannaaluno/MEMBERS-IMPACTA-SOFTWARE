import { z } from "zod";
import { procedure } from "../../../trpc";
import { dbClient, membro } from "../../../../../../packages/main-db";
import { eq } from "drizzle-orm";

export default procedure
  .input(
    z.object({
      id: z.string().nanoid(),
    })
  )
  .mutation(async (opts) => {
    const { id } = opts.input;

    const [resultado] = await dbClient
      .delete(membro)
      .where(eq(membro.id, id))
      .returning({
        id: membro.id,
      });

    return resultado;
  });
