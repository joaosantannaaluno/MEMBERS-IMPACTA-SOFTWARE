import { z } from "zod";
import { procedure } from "../../../trpc";
import { eq } from "drizzle-orm";
import { dbClient, membro } from "../../../../../../packages/main-db";

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
      .from(membro)
      .where(eq(membro.id, id))
      .execute();

    return resultado;
  });
